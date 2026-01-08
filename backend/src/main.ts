import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logger/interceptors/logging.interceptor';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get LoggerService instance
  const loggerService = app.get(LoggerService);

  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });

  // Set global prefix
  app.setGlobalPrefix('api');

  // Apply logging interceptor globally
  const loggingInterceptor = new LoggingInterceptor(loggerService);
  app.useGlobalInterceptors(loggingInterceptor);

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('BettaLuxury API')
    .setDescription('The BettaLuxury betta fish shop API documentation')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('logs')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 4000;
  await app.listen(port);

  loggerService.info(`Application is running on: http://localhost:${port}`, {
    port,
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development',
  }, 'Bootstrap');

  console.log(
    `Application is running on: http://localhost:${port}`,
  );
  console.log(
    `Swagger documentation: http://localhost:${port}/api`,
  );
}
bootstrap();
