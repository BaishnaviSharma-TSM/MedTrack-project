type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_RANK: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function resolveMinLevel(): LogLevel {
  const configured = process.env.EXPO_PUBLIC_LOG_LEVEL?.toLowerCase();
  if (configured === 'debug' || configured === 'info' || configured === 'warn' || configured === 'error') {
    return configured;
  }
  return __DEV__ ? 'debug' : 'warn';
}

const MIN_LEVEL = resolveMinLevel();

function shouldLog(level: LogLevel) {
  return LEVEL_RANK[level] >= LEVEL_RANK[MIN_LEVEL];
}

function formatPrefix(namespace: string, level: LogLevel) {
  const timestamp = new Date().toISOString().slice(11, 23);
  return `[${timestamp}][MedTrack][${level.toUpperCase()}][${namespace}]`;
}

function redact(value: unknown): unknown {
  if (!value || typeof value !== 'object') return value;

  if (Array.isArray(value)) {
    return value.map(redact);
  }

  const record = value as Record<string, unknown>;
  const next: Record<string, unknown> = {};

  for (const [key, entry] of Object.entries(record)) {
    if (/password|token|authorization|secret/i.test(key)) {
      next[key] = '[redacted]';
    } else {
      next[key] = redact(entry);
    }
  }

  return next;
}

export function createLogger(namespace: string) {
  return {
    debug(message: string, meta?: unknown) {
      if (!shouldLog('debug')) return;
      if (meta !== undefined) {
        console.debug(formatPrefix(namespace, 'debug'), message, redact(meta));
      } else {
        console.debug(formatPrefix(namespace, 'debug'), message);
      }
    },
    info(message: string, meta?: unknown) {
      if (!shouldLog('info')) return;
      if (meta !== undefined) {
        console.info(formatPrefix(namespace, 'info'), message, redact(meta));
      } else {
        console.info(formatPrefix(namespace, 'info'), message);
      }
    },
    warn(message: string, meta?: unknown) {
      if (!shouldLog('warn')) return;
      if (meta !== undefined) {
        console.warn(formatPrefix(namespace, 'warn'), message, redact(meta));
      } else {
        console.warn(formatPrefix(namespace, 'warn'), message);
      }
    },
    error(message: string, meta?: unknown) {
      if (!shouldLog('error')) return;
      if (meta !== undefined) {
        console.error(formatPrefix(namespace, 'error'), message, redact(meta));
      } else {
        console.error(formatPrefix(namespace, 'error'), message);
      }
    },
  };
}

export const appLogger = createLogger('App');
