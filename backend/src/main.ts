import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter, TypeOrmExceptionFilter } from './middleware/error/error.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.setGlobalPrefix("api/v1");
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.enableCors({
    // origin: [process.env.CLIENT_HOST_CORS],
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  const configSwagger = new DocumentBuilder()
    .setTitle('Api MyKingDom')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);


  await app.listen(9000);
  // await app.listen(5000);
}
bootstrap();
