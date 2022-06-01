import { DatabaseModule } from '@core/database/database.module'
import { TodoModule } from '@domain/todo/todo.module'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    TodoModule,

    // * app 실행 시 필수로 필요한 모듈
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
