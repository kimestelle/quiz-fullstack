import { createRequire } from 'node:module';

import {
  CamelCasePlugin, //converts TypeScript identifiers to PostgreSQL snake_case
  Kysely,
  PostgresDialect,
  type PostgresPool,
} from 'kysely';

import type { Database } from './types.ts';

type PoolConstructor = new (config: {
  connectionString: string;
}) => PostgresPool;

const require = createRequire(import.meta.url);
const { Pool } = require('pg') as { Pool: PoolConstructor };

export function createDatabase(connectionString: string): Kysely<Database> {
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({ connectionString }),
    }),
    plugins: [new CamelCasePlugin()],
  });
}
