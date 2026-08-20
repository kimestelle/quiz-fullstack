import { spawn } from 'node:child_process';

const commands = [
  {
    script: 'dev:server',
    env: { ...process.env, PORT: process.env.SERVER_PORT ?? '4000' },
  },
  {
    script: 'dev:client',
    env: { ...process.env, PORT: process.env.CLIENT_PORT ?? '3000' },
  },
];

const children = commands.map(({ script, env }) =>
  spawn('npm', ['run', script], {
    detached: process.platform !== 'win32',
    env,
    stdio: 'inherit',
  })
);

let stopping = false;

function stop(signal = 'SIGTERM') {
  if (stopping) return;
  stopping = true;

  for (const child of children) {
    if (child.pid === undefined) continue;

    try {
      if (process.platform === 'win32') child.kill(signal);
      else process.kill(-child.pid, signal);
    } catch (error) {
      if (
        !(error instanceof Error) ||
        !('code' in error) ||
        error.code !== 'ESRCH'
      ) {
        throw error;
      }
    }
  }
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => stop(signal));
}

for (const child of children) {
  child.on('exit', (code) => {
    if (!stopping) {
      process.exitCode = code ?? 1;
      stop();
    }
  });
}
