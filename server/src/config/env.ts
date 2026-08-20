import { z } from 'zod';

const envSchema = z.object({
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z
    .string()
    .default('postgresql://postgres:postgres@localhost:5432/concentrate-quiz'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
});

export const env = envSchema.parse(process.env);
