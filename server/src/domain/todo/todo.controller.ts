import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'

import { CreateTodoDto } from './dto/create-todo.dto'
import { SearchTodoDto } from './dto/search-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoService } from './todo.service'

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/')
  async createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto)
  }

  @Get('/')
  async getAllTodos(@Query() query: SearchTodoDto) {
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
