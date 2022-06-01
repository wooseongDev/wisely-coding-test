import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateManyRelatedTodosDto } from './dto/create-many-related-todos.dto'
import { RelatedTodos } from './related-todo.entity'

@Injectable()
export class RelatedTodoService {
  constructor(@InjectRepository(RelatedTodos) private readonly relatedTodosRepository: Repository<RelatedTodos>) {}

  async createManyRelatedTodos(dto: CreateManyRelatedTodosDto): Promise<void> {
    const { parentIds, childId } = dto
    await this.relatedTodosRepository.save(parentIds.map((parentId) => ({ parentId, childId })))
  }
}
