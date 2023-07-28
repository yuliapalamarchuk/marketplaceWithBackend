import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('Каталог книг')
  .setDescription('Описание')
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(3000);

  function foo<T>(arr: T[], callback: (el: T, i: number, arr: T[]) => T)
{
  return arr.reduce((acc: T[], value, index) => {
    const result = callback(value, index, arr)
    acc.push(result)
    return acc
  }, []);
}
}
bootstrap();
