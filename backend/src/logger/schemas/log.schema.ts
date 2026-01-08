import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

@Schema({ timestamps: true })
export class Log extends Document {
  @ApiProperty({ enum: LogLevel, description: 'Log level' })
  @Prop({ required: true, enum: LogLevel })
  level: LogLevel;

  @ApiProperty({ description: 'Log message' })
  @Prop({ required: true })
  message: string;

  @ApiProperty({ description: 'Module that generated the log' })
  @Prop({ required: true, index: true })
  module: string;

  @ApiProperty({ description: 'User ID if applicable' })
  @Prop()
  userId?: string;

  @ApiProperty({ description: 'User email if applicable' })
  @Prop()
  userEmail?: string;

  @ApiProperty({ description: 'IP address' })
  @Prop()
  ip?: string;

  @ApiProperty({ description: 'User agent' })
  @Prop()
  userAgent?: string;

  @ApiProperty({ description: 'HTTP method' })
  @Prop()
  method?: string;

  @ApiProperty({ description: 'URL' })
  @Prop()
  url?: string;

  @ApiProperty({ description: 'HTTP status code' })
  @Prop()
  statusCode?: number;

  @ApiProperty({ description: 'Response time in ms' })
  @Prop()
  responseTime?: number;

  @ApiProperty({ description: 'Additional context data' })
  @Prop({ type: Object })
  context?: Record<string, any>;

  @ApiProperty({ description: 'Error stack trace' })
  @Prop()
  stack?: string;

  @ApiProperty({ description: 'Error name' })
  @Prop()
  errorName?: string;

  @ApiProperty({ description: 'Error message' })
  @Prop()
  errorMessage?: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);

// Indexes for better query performance
LogSchema.index({ createdAt: -1 });
LogSchema.index({ level: 1, createdAt: -1 });
LogSchema.index({ userId: 1, createdAt: -1 });
LogSchema.index({ module: 1, createdAt: -1 });
