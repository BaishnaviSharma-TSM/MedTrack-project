import { Logger } from '@nestjs/common';

export class AppLogger extends Logger {
  info(message: string, context?: string) {
    this.log(message, context ?? this.context);
  }

  success(message: string, context?: string) {
    this.log(`✓ ${message}`, context ?? this.context);
  }
}

export function createLogger(context: string) {
  return new AppLogger(context);
}
