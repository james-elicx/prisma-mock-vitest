import type { PrismaClient } from '@prisma/client';
import { suite, test, expect } from 'vitest';
import { createPrismaClient } from '../src';

suite('Queries with Distinct', () => {
  const baseData = {
    user: [
      {
        id: 1,
        name: 'Piet',
      },
      {
        id: 2,
        name: 'Piet',
      },
      {
        id: 3,
        name: 'Henk',
      },
      {
        id: 4,
        name: 'Henk',
      },
    ],
  };

  test('distinct', async () => {
    const client = await createPrismaClient<PrismaClient>(baseData);

    let users = await client.user.findMany({
      distinct: ['id'],
    });

    expect(users.length).toBe(4);

    users = await client.user.findMany({
      distinct: ['name'],
    });

    expect(users.length).toBe(2);
  });
});
