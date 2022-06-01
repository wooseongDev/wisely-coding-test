import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'

import { CreateTodoDto } from './dto/create-todo.dto'
import { PaginationDto } from './dto/pagination.dto'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/')
  async createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto)
  }

  @Get('/')
  async getAllTodos(@Query() query: PaginationDto) {
    return this.todoService.getManyTodos(query)
  }

  @Get('/:id')
  async getOneTodoById(@Param('id') id: number) {
    return this.todoService.getOneTodoById(id)
  }
}
