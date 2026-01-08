import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from './logger.service';
import { LogController } from './logger.controller';
import { Log, LogSchema } from './schemas/log.schema';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  controllers: [LogController],
  providers: [LoggerService, LoggingInterceptor],
  exports: [LoggerService, LoggingInterceptor],
})
export class LoggerModule {}
