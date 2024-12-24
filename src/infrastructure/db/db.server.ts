import { singleton } from '../utils/singleton.server';
import { PrismaClient } from '@prisma/client';

export const prisma = singleton('prisma', () => {
  const client = new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'stdout' },
      { level: 'info', emit: 'stdout' },
      { level: 'warn', emit: 'stdout' },
    ],
  });

  client.$on('query', (e) => {
    console.log('event:query', e);
  });
  client.$connect();

  return client;
});
