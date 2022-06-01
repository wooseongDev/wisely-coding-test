import { Todos } from '@domain/todo/todo.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('related_todos')
export class RelatedTodos {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number

  @Column({ name: 'parent_id', nullable: false })
  parentId!: number

  @Column({ name: 'child_id', nullable: false })
  childId!: number

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date | null

  @ManyToOne(() => Todos, (todos) => todos.parentTodos)
  @JoinColumn({ name: 'parent_id' })
  parentTodo!: Todos

  @ManyToOne(() => Todos, (todos) => todos.childrenTodos)
  @JoinColumn({ name: 'child_id' })
  childTodo!: Todos
}
