import { RelatedTodoService } from '@domain/related-todo/related-todo.service'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateTodoDto } from './dto/create-todo.dto'
import { PaginationDto } from './dto/pagination.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Todos } from './todo.entity'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todos)
    private readonly todoRepository: Repository<Todos>,
    private readonly relatedTodoService: RelatedTodoService
  ) {}

  async createTodo(dto: CreateTodoDto): Promise<void> {
    const { text, parentIds } = dto
    const todo = await this.todoRepository.save({ text, isCompleted: false })

    if (parentIds) {
      await this.relatedTodoService.createManyRelatedTodos({
        parentIds,
        childId: todo.id,
      })
    }
  }

  async getManyTodos(dto: PaginationDto): Promise<{ total: number; data: Todos[] }> {
    const { page = 1, size = 20 } = dto

    const [todos, total] = await this.todoRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
      order: { createdAt: 'DESC' },
      relations: { parentTodos: true },
    })

    return {
      total,
      data: todos,
    }
  }

  async getOneTodoById(id: number): Promise<Todos> {
    return this.todoRepository.findOne({
      where: { id },
      relations: { parentTodos: true },
    })
  }

  async updateOneTodo(id: number, dto: UpdateTodoDto): Promise<void> {
    const { text, isCompleted, parentIds: willUpdateIds = [] } = dto
    const todo = await this.getOneTodoById(id)
    if (!todo) return

    const parentIds = todo.parentTodos.map((parentTodo) => parentTodo.parentId)

    const willCreateRelatedTodoIds = willUpdateIds.filter((relatedId) => !parentIds.includes(relatedId))
    const willDeleteRelatedTodoIds = parentIds.filter((parentId) => !willUpdateIds.includes(parentId))

    let { completedAt } = todo
    if (!dto.isCompleted) completedAt = null
    if (!todo.isCompleted && dto.isCompleted) completedAt = new Date()

    await this.todoRepository.save({ ...todo, text, isCompleted, completedAt })

    if (willCreateRelatedTodoIds.length) {
      await this.relatedTodoService.createManyRelatedTodos({
        parentIds: willCreateRelatedTodoIds,
        childId: id,
      })
    }
    if (willDeleteRelatedTodoIds.length) {
      await this.relatedTodoService.deleteManyRelatedTodos({
        parentIds: willDeleteRelatedTodoIds,
        childId: todo.id,
      })
    }
  }

  async deleteOneTodoById(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: { parentTodos: true, childrenTodos: true },
    })

    if (!todo) return
    await this.relatedTodoService.deleteManyRelatedTodosByTodoId(todo.id)
    await this.todoRepository.softDelete(todo.id)
  }
}
