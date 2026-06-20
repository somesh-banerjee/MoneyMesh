import { ForbiddenException } from '@nestjs/common';
import { TransactionDirection, TransactionType } from '@prisma/client';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  const userId = 'user-1';
  const accountId = 'account-1';

  const createMockTx = () => ({
    transaction: {
      create: jest.fn(),
    },
    account: {
      update: jest.fn(),
    },
    investment: {
      updateMany: jest.fn(),
    },
  });

  const buildService = () => {
    const prisma = {
      transaction: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    const service = new TransactionService(prisma as any);
    return { service, prisma };
  };

  it('creates a transaction and updates account balance atomically', async () => {
    const { service, prisma } = buildService();
    const tx = createMockTx();

    prisma.transaction.findFirst.mockResolvedValue(null);
    prisma.$transaction.mockImplementation(async (callback) => callback(tx));

    tx.transaction.create.mockResolvedValue({
      id: 'tx-1',
      amount: '100',
      balance: '100',
      category: 'Salary',
      note: 'Monthly',
      type: TransactionType.INCOME,
      direction: TransactionDirection.CREDIT,
      counterparty: 'Employer',
      created_at: new Date('2026-01-01T00:00:00.000Z'),
      account_id: accountId,
      user_id: userId,
      account: {
        id: accountId,
        type: 'BANK',
        balance: '100',
      },
      user: { id: userId, email: 'user@example.com' },
    });

    const result = await service.create({
      amount: '100',
      category: 'Salary',
      note: 'Monthly',
      type: TransactionType.INCOME,
      direction: TransactionDirection.CREDIT,
      counterparty: 'Employer',
      created_at: new Date('2026-01-01T00:00:00.000Z'),
      account_id: accountId,
    }, userId);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(tx.transaction.create).toHaveBeenCalledTimes(1);
    expect(tx.account.update).toHaveBeenCalledTimes(1);
    expect(result.amount).toBe('100');
    expect(result.balance).toBe('100');
  });

  it('rejects backdated transactions', async () => {
    const { service, prisma } = buildService();

    prisma.transaction.findFirst.mockResolvedValue({
      created_at: new Date('2026-06-01T00:00:00.000Z'),
      balance: '50',
    });

    await expect(service.create({
      amount: '10',
      category: 'Food',
      note: '',
      type: TransactionType.EXPENSE,
      direction: TransactionDirection.DEBIT,
      counterparty: 'Store',
      created_at: new Date('2026-01-01T00:00:00.000Z'),
      account_id: accountId,
    }, userId)).rejects.toBeInstanceOf(ForbiddenException);
  });
});
