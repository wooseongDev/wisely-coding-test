import { RelatedTodoService } from '@domain/related-todo/related-todo.service'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { Between, ILike, Repository } from 'typeorm'

import { CreateTodoDto } from './dto/create-todo.dto'
import { SearchTodoDto } from './dto/search-todo.dto'
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

  async getManyTodos(dto: SearchTodoDto): Promise<{ total: number; data: Todos[] }> {
    const { page = 1, size = 20, text, isCompleted, completedAt, createdAt, updatedAt } = dto

    const betweenDate = (date: string) => {
      const start = dayjs(date).startOf('d').toDate()
      const end = dayjs(date).endOf('d').toDate()
      return Between(start, end)
    }

    const [todos, total] = await this.todoRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
      where: {
        text: text && ILike(`%${text}%`),
        isCompleted: isCompleted === undefined ? undefined : !!isCompleted,
        completedAt: completedAt && betweenDate(completedAt),
        createdAt: createdAt && betweenDate(createdAt),
        updatedAt: updatedAt && betweenDate(updatedAt),
      },
      order: { createdAt: 'DESC' },
      relations: { parentTodos: true },
    })

    return {
      total,
      data: todos,
    }
  }

  async getOneTodoById(id: number): Promise<Todos> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: { parentTodos: true },
    })

    if (!todo) throw new NotFoundException('todo 가 없습니다')
    return todo
  }

  async updateOneTodoRelation(todo: Todos, parentIds?: number[]): Promise<void> {
    if (parentIds === undefined) return

    const relatedParentIds = todo.parentTodos.map(({ parentId }) => parentId)

    const willCreateParentIds = parentIds.filter((id) => !relatedParentIds.includes(id))
    const willDeleteParentIds = relatedParentIds.filter((id) => !parentIds.includes(id))

    if (willCreateParentIds.length) {
      await this.relatedTodoService.createManyRelatedTodos({
        parentIds: willCreateParentIds,
        childId: todo.id,
      })
    }

    if (willDeleteParentIds.length) {
      await this.relatedTodoService.deleteManyRelatedTodos({
        parentIds: willDeleteParentIds,
        childId: todo.id,
      })
    }
  }

  async updateOneTodo(id: number, dto: UpdateTodoDto): Promise<void> {
    const { text, isCompleted, parentIds } = dto
    const todo = await this.getOneTodoById(id)
    if (!todo) return

    await this.updateOneTodoRelation(todo, parentIds)

    let { completedAt } = todo
    if (!dto.isCompleted) completedAt = null
    if (!todo.isCompleted && dto.isCompleted) completedAt = dayjs().toDate()

    let isAbleUpdateCompleted = true
    const parentTodoIds = todo.parentTodos.map(({ parentId }) => parentId)

    if (parentTodoIds.length) {
      const parentTodos = await this.todoRepository.findBy(parentTodoIds.map((parentId) => ({ id: parentId })))
      isAbleUpdateCompleted = parentTodos.every((parentTodo) => parentTodo.isCompleted)
    }

    if (isCompleted && !isAbleUpdateCompleted) {
      throw new BadRequestException('완료되지 않은 상위 todo 가 존재합니다')
    }

    await this.todoRepository.save({ ...todo, text, isCompleted, completedAt })
  }

  async deleteOneTodoById(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: { parentTodos: true, childrenTodos: true },
    })

    if (!todo) throw new NotFoundException('todo 가 없습니다')
    await this.relatedTodoService.deleteManyRelatedTodosByTodoId(todo.id)
    await this.todoRepository.softDelete(todo.id)
  }
}
