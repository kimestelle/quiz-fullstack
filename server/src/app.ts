import Fastify, { type FastifyInstance } from 'fastify';
import type { Redis } from 'ioredis';
import type { Kysely } from 'kysely';

import type { Database } from './database/types.ts';

declare module 'fastify' {
  interface FastifyInstance {
    database: Kysely<Database>;
    redis: Redis;
  }
}

type AppDependencies = {
  database: Kysely<Database>;
  redis: Redis;
};

export function buildApp(dependencies: AppDependencies): FastifyInstance {
  const app = Fastify({ logger: true });

  app.decorate('database', dependencies.database);
  app.decorate('redis', dependencies.redis);

  app.get('/health', async () => ({ status: 'ok' }));

  app.addHook('onClose', async () => {
    dependencies.redis.disconnect();
    await dependencies.database.destroy();
  });

  return app;
}
