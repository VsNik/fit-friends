import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PREFIX = 'api';
const DEFAULT_PORT = 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || DEFAULT_PORT;
  app.setGlobalPrefix(PREFIX);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true, }));

  const config = new DocumentBuilder()
    .setTitle('FitFriends')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);

  Logger.log(`🚀 Backend is running on: http://localhost:${port}/${PREFIX}`, 'App');
  Logger.log(`🚀 API documentation on: http://localhost:${port}/docs`, 'App');
}

bootstrap();
