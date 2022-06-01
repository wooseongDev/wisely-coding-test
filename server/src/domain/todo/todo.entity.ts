import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

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
}