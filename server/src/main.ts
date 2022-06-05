import { AppModule } from '@app/app.module'
import { RequestMethod, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

const PORT = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  app.enableCors({
    origin: ['http://localhost:3000', 'https://wisely-coding-test.vercel.app'],
  })

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  })

  await app.listen(PORT)
}

bootstrap().then(() => {
  console.info(`Started server on port ${PORT}, url: http://localhost:${PORT}`)
})
