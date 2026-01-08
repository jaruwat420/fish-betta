import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

export interface LogContext {
  userId?: string;
  email?: string;
  ip?: string;
  userAgent?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  responseTime?: number;
  [key: string]: any;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: LogContext;
  stack?: string;
  module: string;
}

@Injectable()
export class LoggerService {
  private readonly logger = new Logger('AppLogger');
  private logs: LogEntry[] = [];
  private readonly maxLogsInMemory = 1000;

  constructor() {
    this.logSystemInfo();
  }

  private logSystemInfo() {
    this.info('Logger Service initialized', {
      nodeVersion: process.version,
      platform: process.platform,
      env: process.env.NODE_ENV || 'development',
    });
  }

  debug(message: string, context?: LogContext, module = 'App') {
    this.createLog(LogLevel.DEBUG, message, context, module);
  }

  info(message: string, context?: LogContext, module = 'App') {
    this.createLog(LogLevel.INFO, message, context, module);
  }

  warn(message: string, context?: LogContext, module = 'App') {
    this.createLog(LogLevel.WARN, message, context, module);
  }

  error(message: string, error?: Error, context?: LogContext, module = 'App') {
    const logContext = {
      ...context,
      errorName: error?.name,
      errorMessage: error?.message,
      stack: error?.stack,
    };
    this.createLog(LogLevel.ERROR, message, logContext, module);
  }

  critical(message: string, error?: Error, context?: LogContext, module = 'App') {
    const logContext = {
      ...context,
      errorName: error?.name,
      errorMessage: error?.message,
      stack: error?.stack,
    };
    this.createLog(LogLevel.CRITICAL, message, logContext, module);
  }

  logAuth(action: string, userId?: string, email?: string, success = true, context?: LogContext) {
    const logContext: LogContext = {
      ...context,
      userId,
      email,
      action,
      success,
    };

    if (success) {
      this.info(`Auth: ${action} successful`, logContext, 'Auth');
    } else {
      this.warn(`Auth: ${action} failed`, logContext, 'Auth');
    }
  }

  logApiRequest(method: string, url: string, statusCode: number, responseTime: number, context?: LogContext) {
    const logContext: LogContext = {
      ...context,
      method,
      url,
      statusCode,
      responseTime,
    };

    if (statusCode >= 500) {
      this.error(`API: ${method} ${url} - ${statusCode}`, undefined, logContext, 'API');
    } else if (statusCode >= 400) {
      this.warn(`API: ${method} ${url} - ${statusCode}`, logContext, 'API');
    } else {
      this.info(`API: ${method} ${url} - ${statusCode}`, logContext, 'API');
    }
  }

  logDatabase(operation: string, collection: string, success = true, context?: LogContext) {
    const logContext: LogContext = {
      ...context,
      operation,
      collection,
    };

    if (success) {
      this.debug(`DB: ${operation} on ${collection}`, logContext, 'Database');
    } else {
      this.error(`DB: ${operation} on ${collection} failed`, undefined, logContext, 'Database');
    }
  }

  logBusinessEvent(event: string, entityType: string, entityId: string, context?: LogContext) {
    const logContext: LogContext = {
      ...context,
      event,
      entityType,
      entityId,
    };

    this.info(`Business Event: ${event} on ${entityType} ${entityId}`, logContext, 'Business');
  }

  logError(error: Error, context?: LogContext, module = 'App') {
    this.error(error.message, error, context, module);
  }

  private createLog(level: LogLevel, message: string, context?: LogContext, module = 'App') {
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      module,
    };

    // Keep only recent logs in memory
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogsInMemory) {
      this.logs.shift();
    }

    // Console output with colors
    this.outputLog(logEntry);
  }

  private outputLog(logEntry: LogEntry) {
    const { level, message, context, module } = logEntry;
    const timestamp = logEntry.timestamp.toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    const logMessage = `[${timestamp}] [${module}] ${message}${contextStr}`;

    switch (level) {
      case LogLevel.DEBUG:
        this.logger.debug(logMessage);
        break;
      case LogLevel.INFO:
        this.logger.log(logMessage);
        break;
      case LogLevel.WARN:
        this.logger.warn(logMessage);
        break;
      case LogLevel.ERROR:
        this.logger.error(logMessage);
        break;
      case LogLevel.CRITICAL:
        this.logger.error(logMessage);
        break;
      default:
        this.logger.log(logMessage);
    }
  }

  getRecentLogs(limit = 100): LogEntry[] {
    return this.logs.slice(-limit);
  }

  getLogsByLevel(level: LogLevel, limit = 100): LogEntry[] {
    return this.logs
      .filter(log => log.level === level)
      .slice(-limit);
  }

  getLogsByModule(module: string, limit = 100): LogEntry[] {
    return this.logs
      .filter(log => log.module === module)
      .slice(-limit);
  }

  getLogsByUser(userId: string, limit = 100): LogEntry[] {
    return this.logs
      .filter(log => log.context?.userId === userId)
      .slice(-limit);
  }

  clearLogs() {
    this.logs = [];
    this.info('Logs cleared', {}, 'System');
  }

  getLogStats() {
    const stats = {
      total: this.logs.length,
      byLevel: {} as Record<string, number>,
      byModule: {} as Record<string, number>,
      last24h: 0,
    };

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    this.logs.forEach(log => {
      // Count by level
      stats.byLevel[log.level] = (stats.byLevel[log.level] || 0) + 1;

      // Count by module
      stats.byModule[log.module] = (stats.byModule[log.module] || 0) + 1;

      // Count last 24 hours
      if (log.timestamp > twentyFourHoursAgo) {
        stats.last24h++;
      }
    });

    return stats;
  }
}
