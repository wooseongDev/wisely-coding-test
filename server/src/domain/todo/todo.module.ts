import { RelatedTodoModule } from '@domain/related-todo/related-todo.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TodoController } from './todo.controller'
import { Todos } from './todo.entity'
import { TodoService } from './todo.service'

@Module({
  imports: [TypeOrmModule.forFeature([Todos]), RelatedTodoModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
