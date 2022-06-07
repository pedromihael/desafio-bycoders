import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeTransactionRepository } from '../../repository/FakeTransactionRepository';
import { ITransactionRepository } from '../../repository/ITransactionRepository';
import { FindAllTransactions } from './findAllTransactions';
import { TransactionBuilder } from '../../builder/TransactionBuilder';

let transactionRepository: ITransactionRepository;
let findAllTransactions: FindAllTransactions;
let transactionId1: any;
let transactionId2: any;

describe('FindAllTransactions', () => {
  beforeEach(() => {
    transactionRepository = new FakeTransactionRepository();
    findAllTransactions = new FindAllTransactions(transactionRepository);
    transactionId1 = uuidv4();
    transactionId2 = uuidv4();
  });

  it('should list all transactions there is transactions in database', async () => {
    const transactionData1 = new TransactionBuilder(transactionId1).build();
    const transactionData2 = new TransactionBuilder(transactionId2).build();

    await transactionRepository.save(transactionData1);
    await transactionRepository.save(transactionData2);

    const result = await findAllTransactions.execute();

    expect(result).toHaveLength(2)
    result.map(r => {
      expect(r).toBeInstanceOf(Object)
    })
  });

  it('should list no user if there is no content in database', async () => {
    const transactionData1 = new TransactionBuilder(transactionId1).build();
    const transactionData2 = new TransactionBuilder(transactionId2).build();
    const transactionDatas = [transactionData1, transactionData2];

    const result = await findAllTransactions.execute();

    expect(result).not.toEqual(expect.arrayContaining(transactionDatas));
  });
});