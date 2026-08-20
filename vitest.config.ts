import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['client/**/*.test.{ts,tsx}', 'server/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['client/app/**/*.{ts,tsx}', 'server/src/**/*.ts'],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
});
