import type { LogLevel } from '@nestjs/common';

const ORDERED_LEVELS: LogLevel[] = [
  'verbose',
  'debug',
  'log',
  'warn',
  'error',
  'fatal',
];

export function resolveNestLogLevels(level = process.env.LOG_LEVEL ?? 'log'): LogLevel[] {
  const index = ORDERED_LEVELS.indexOf(level as LogLevel);
  const start = index >= 0 ? index : ORDERED_LEVELS.indexOf('log');

  return ORDERED_LEVELS.slice(start);
}
