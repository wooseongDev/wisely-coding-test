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

// ! 관계가 순환하는 todos entity 는 어떻게 해야할까?
// ! 조상 path 를 저장하는 column 을 만들어도 조상의 부모가 추가되면 참조하는 모든 path 가 업데이트 되어야 하는데..
// ! db 쪽에서 해결하는 방법을 모르기에 일단 넘어감.

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
