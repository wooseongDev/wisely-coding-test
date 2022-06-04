import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ManyRelatedTodosDto } from './dto/many-related-todos.dto'
import { RelatedTodos } from './related-todo.entity'

@Injectable()
export class RelatedTodoService {
  constructor(@InjectRepository(RelatedTodos) private readonly relatedTodosRepository: Repository<RelatedTodos>) {}

  async createManyRelatedTodos(dto: ManyRelatedTodosDto): Promise<void> {
    const { parentIds, childId } = dto

    const relatedTodos = await this.relatedTodosRepository.find({
      where: { childId },
      withDeleted: true,
    })
    const willRestoreTodos = relatedTodos.filter((todo) => todo.deletedAt)
    const willRestoreTodoParentIds = willRestoreTodos.map((todo) => todo.parentId)
    const willCreateTodoIds = parentIds.filter((parentId) => !willRestoreTodoParentIds.includes(parentId))

    if (willRestoreTodos.length) {
      await this.relatedTodosRepository.restore(willRestoreTodos.map((todo) => todo.id))
    }
    if (willCreateTodoIds.length) {
      await this.relatedTodosRepository.save(willCreateTodoIds.map((parentId) => ({ parentId, childId })))
    }
  }

  async deleteManyRelatedTodos(dto: ManyRelatedTodosDto): Promise<void> {
    const { parentIds, childId } = dto
    const relatedTodos = await this.relatedTodosRepository.findBy(parentIds.map((parentId) => ({ parentId, childId })))

    if (relatedTodos.length) {
      await this.relatedTodosRepository.softDelete(relatedTodos.map((x) => x.id))
    }
  }

  async deleteManyRelatedTodosByTodoId(todoId: number): Promise<void> {
    const relatedTodos = await this.relatedTodosRepository.findBy([{ parentId: todoId }, { childId: todoId }])

    if (relatedTodos.length) {
      await this.relatedTodosRepository.softDelete(relatedTodos.map((x) => x.id))
    }
  }
}
