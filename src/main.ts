import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const swaggerDocBuilder = new DocumentBuilder()
    .setTitle('Candle shop')
    .setDescription('Candle shop API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerDocBuilder);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
