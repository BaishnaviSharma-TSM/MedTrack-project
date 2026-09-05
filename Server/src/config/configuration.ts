export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    name: process.env.DB_NAME ?? 'medtrack',
    ssl: process.env.DB_SSL === 'true',
    logging: process.env.DB_LOGGING === 'true',
  },
  logging: {
    level: process.env.LOG_LEVEL ?? 'log',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'dev-secret',
    accessExpires: process.env.JWT_ACCESS_EXPIRES ?? '15m',
    refreshExpires: process.env.JWT_REFRESH_EXPIRES ?? '7d',
  },
  seed: {
    defaultPassword: process.env.SEED_DEFAULT_PASSWORD ?? 'MedTrack@123',
  },
  corsOrigins: process.env.CORS_ORIGINS ?? '*',
});
