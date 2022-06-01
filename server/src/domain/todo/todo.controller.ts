import { Body, Controller, Post } from '@nestjs/common'

import { CreateTodoDto } from './dto/create-todo.dto'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto)
  }
}
