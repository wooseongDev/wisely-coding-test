import { RelatedTodos } from '@domain/related-todo/related-todo.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('todos')
export class Todos {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number

  @Column({ name: 'text', nullable: false })
  text!: string

  @Column({ name: 'is_completed', nullable: false })
  isCompleted!: boolean

  @Column({ type: 'datetime', name: 'completed_at', nullable: true })
  completedAt!: Date | null

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date | null

  @OneToMany(() => RelatedTodos, (relatedTodos) => relatedTodos.parentTodo)
  parentTodos!: RelatedTodos[]

  @OneToMany(() => RelatedTodos, (relatedTodos) => relatedTodos.childTodo)
  childTodos!: RelatedTodos[]
}
