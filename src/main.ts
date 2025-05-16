import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security Middlewares
  app.use(helmet());
  app.enableCors({ origin: true, credentials: true });
  app.use(compression());
  app.use(rateLimit.default({ windowMs: 15 * 60 * 1000, max: 100 }));

  // Global Interceptor for unified response
  app.useGlobalInterceptors(new ResponseInterceptor());
  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());
  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Zoombar API')
    .setDescription('API documentation for Zoombar announcement bar service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
