import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigInterface } from './config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService: ConfigService<ConfigInterface> = app.get(ConfigService);

  const env = configService.get('NODE_ENV') || 'development';
  if (env !== 'production') app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const swaggerDocBuilder = new DocumentBuilder()
    .setTitle('Candle shop')
    .setDescription('Candle shop API')
    .setVersion('1.0')
    .addBearerAuth();

  const serverUrl = configService.get('SWAGGER_TARGET_SERVER_URL');
  if (serverUrl) swaggerDocBuilder.addServer(serverUrl);

  const document = SwaggerModule.createDocument(app, swaggerDocBuilder.build());
  SwaggerModule.setup('docs', app, document);

  await app.listen(+(configService.get('PORT') || '3000'));
}
bootstrap();
