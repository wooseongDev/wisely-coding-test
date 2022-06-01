import { CreateTodoDto } from '@domain/todo/dto/create-todo.dto'
import { Todos } from '@domain/todo/todo.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
}
