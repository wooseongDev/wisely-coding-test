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

  async updateOneTodo(id: number, dto: UpdateTodoDto): Promise<Todos> {
    const todo = await this.todoRepository.findOneBy({ id })

    let { completedAt } = todo
    if (!dto.isCompleted) completedAt = null
    if (!todo.isCompleted && dto.isCompleted) completedAt = new Date()

    return this.todoRepository.save({ ...todo, ...dto, completedAt })
  }

  async deleteOneTodoById(id: number): Promise<void> {
    await this.todoRepository.softDelete({ id })
  }
}
