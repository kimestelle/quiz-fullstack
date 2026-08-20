import { buildApp } from './app.ts';
import { env } from './config/env.ts';
import { createDatabase } from './database/client.ts';
import { createRedis } from './redis/client.ts';

const app = buildApp({
  database: createDatabase(env.DATABASE_URL),
  redis: createRedis(env.REDIS_URL),
});

async function close() {
  await app.close();
}

process.once('SIGINT', close);
process.once('SIGTERM', close);

try {
  await app.listen({ host: env.HOST, port: env.PORT });
} catch (error) {
  app.log.error(error);
  await close();
  process.exitCode = 1;
}
