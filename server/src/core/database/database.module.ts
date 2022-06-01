import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, 'wisely-todo-db.sqlite'),
      entities: [join(__dirname, '../../domain/**/*.entity.{js,ts}')],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
