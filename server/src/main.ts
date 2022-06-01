import { AppModule } from '@app/app.module'
import { NestFactory } from '@nestjs/core'

const PORT = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT)
}

bootstrap().then(() => {
  console.info(`Started server on port ${PORT}, url: http://localhost:${PORT}`)
})
