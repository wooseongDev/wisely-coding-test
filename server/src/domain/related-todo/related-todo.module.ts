import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RelatedTodos } from './related-todo.entity'
import { RelatedTodoService } from './related-todo.service'

@Module({
  imports: [TypeOrmModule.forFeature([RelatedTodos])],
  providers: [RelatedTodoService],
  exports: [RelatedTodoService],
})
export class RelatedTodoModule {}
