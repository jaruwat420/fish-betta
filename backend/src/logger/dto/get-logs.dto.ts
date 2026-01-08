import { IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LogLevel } from '../schemas/log.schema';
import { Type } from 'class-transformer';

export class GetLogsDto {
  @ApiProperty({
    description: 'Filter by log level',
    enum: LogLevel,
    required: false,
  })
  @IsOptional()
  @IsEnum(LogLevel)
  level?: LogLevel;

  @ApiProperty({
    description: 'Filter by module',
    required: false,
    example: 'Auth',
  })
  @IsOptional()
  module?: string;

  @ApiProperty({
    description: 'Filter by user ID',
    required: false,
  })
  @IsOptional()
  userId?: string;

  @ApiProperty({
    description: 'Number of logs to return',
    required: false,
    default: 100,
    minimum: 1,
    maximum: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(1000)
  limit?: number = 100;

  @ApiProperty({
    description: 'Offset for pagination',
    required: false,
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number = 0;
}
