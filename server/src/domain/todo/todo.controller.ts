import { UpdateTodoDto } from '@domain/todo/dto/update-todo.dto'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'

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

  @Patch('/:id')
  async updateOneTodo(@Param('id') id: number, @Body() dto: UpdateTodoDto) {
    return this.todoService.updateOneTodo(id, dto)
  }

  @Delete('/:id')
  async deleteOneTodoById(@Param('id') id: number) {
    return this.todoService.deleteOneTodoById(id)
  }
}
