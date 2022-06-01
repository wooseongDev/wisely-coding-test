import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateTodoDto } from './dto/create-todo.dto'
import { PaginationDto } from './dto/pagination.dto'
import { Todos } from './todo.entity'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todos)
    private readonly todoRepository: Repository<Todos>
  ) {}

  async createTodo(dto: CreateTodoDto): Promise<void> {
    const { text } = dto
    await this.todoRepository.save({ text, isCompleted: false })
  }

  async getManyTodos(dto: PaginationDto): Promise<{ total: number; data: Todos[] }> {
    const { page = 1, size = 20 } = dto

    const [todos, total] = await this.todoRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
      order: { createdAt: 'DESC' },
    })

    return {
      total,
      data: todos,
    }
  }
}