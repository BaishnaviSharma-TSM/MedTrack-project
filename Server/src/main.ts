import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { createLogger } from './common/logger/app.logger';
import { resolveNestLogLevels } from './common/logger/log-levels';

async function bootstrap() {
  const bootstrapLogger = createLogger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: resolveNestLogLevels(process.env.LOG_LEVEL),
  });
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const corsOrigins = configService.get<string>('corsOrigins') ?? '*';
  app.enableCors({
    origin: corsOrigins === '*' ? true : corsOrigins.split(','),
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MedTrack API')
    .setDescription('MedTrack backend API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('port') ?? 3000;
  const dbLogging = configService.get<boolean>('database.logging') ?? false;

  await app.listen(port);

  bootstrapLogger.success(`MedTrack API listening on http://localhost:${port}/api/v1`);
  bootstrapLogger.info(`Swagger docs at http://localhost:${port}/api/docs`);
  bootstrapLogger.info(`Log level: ${configService.get<string>('logging.level') ?? 'log'}`);
  bootstrapLogger.info(`DB query logging: ${dbLogging ? 'enabled' : 'disabled'}`);
}

bootstrap();
