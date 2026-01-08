import {
  Controller,
  Get,
  Query,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { LoggerService } from './logger.service';
import { GetLogsDto } from './dto/get-logs.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('logs')
@Controller('logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LogController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  @ApiOperation({ summary: 'Get recent logs from memory' })
  @ApiResponse({
    status: 200,
    description: 'Returns recent logs stored in memory',
    schema: {
      example: {
        logs: [
          {
            level: 'INFO',
            message: 'User logged in',
            timestamp: '2025-01-06T10:30:00.000Z',
            context: {
              userId: '507f1f77bcf86cd799439011',
              email: 'user@example.com',
              ip: '127.0.0.1',
            },
            module: 'Auth',
          },
        ],
        total: 1,
      },
    },
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 100 })
  getRecentLogs(@Query() query: { limit?: number }) {
    const limit = query.limit ? parseInt(query.limit.toString()) : 100;
    return {
      logs: this.loggerService.getRecentLogs(limit),
      total: this.loggerService.getRecentLogs(limit).length,
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get log statistics' })
  @ApiResponse({
    status: 200,
    description: 'Returns log statistics',
    schema: {
      example: {
        total: 150,
        byLevel: {
          DEBUG: 30,
          INFO: 80,
          WARN: 25,
          ERROR: 10,
          CRITICAL: 5,
        },
        byModule: {
          Auth: 40,
          API: 50,
          Database: 30,
          Business: 30,
        },
        last24h: 75,
      },
    },
  })
  getLogStats() {
    return this.loggerService.getLogStats();
  }

  @Get('level')
  @ApiOperation({ summary: 'Get logs by level' })
  @ApiResponse({ status: 200, description: 'Returns logs filtered by level' })
  @ApiQuery({ name: 'level', required: true, enum: ['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'] })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 100 })
  getLogsByLevel(@Query() query: { level: string; limit?: number }) {
    const limit = query.limit ? parseInt(query.limit.toString()) : 100;
    return {
      logs: this.loggerService.getLogsByLevel(query.level as any, limit),
      total: this.loggerService.getLogsByLevel(query.level as any, limit).length,
    };
  }

  @Get('module')
  @ApiOperation({ summary: 'Get logs by module' })
  @ApiResponse({ status: 200, description: 'Returns logs filtered by module' })
  @ApiQuery({ name: 'module', required: true, example: 'Auth' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 100 })
  getLogsByModule(@Query() query: { module: string; limit?: number }) {
    const limit = query.limit ? parseInt(query.limit.toString()) : 100;
    return {
      logs: this.loggerService.getLogsByModule(query.module, limit),
      total: this.loggerService.getLogsByModule(query.module, limit).length,
    };
  }

  @Get('user')
  @ApiOperation({ summary: 'Get logs by user ID' })
  @ApiResponse({ status: 200, description: 'Returns logs filtered by user ID' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 100 })
  getLogsByUser(@Query() query: { userId: string; limit?: number }) {
    const limit = query.limit ? parseInt(query.limit.toString()) : 100;
    return {
      logs: this.loggerService.getLogsByUser(query.userId, limit),
      total: this.loggerService.getLogsByUser(query.userId, limit).length,
    };
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Clear all logs from memory' })
  @ApiResponse({ status: 204, description: 'Logs cleared successfully' })
  clearLogs() {
    this.loggerService.clearLogs();
  }
}
