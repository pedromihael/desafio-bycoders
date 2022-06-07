import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeTransactionRepository } from '../../repository/FakeTransactionRepository';
import { ITransactionRepository } from '../../repository/ITransactionRepository';
import { FindTransactionById } from './findTransactionById';
import { TransactionBuilder } from '../../builder/TransactionBuilder';

let transactionRepository: ITransactionRepository;
let findTransactionById: FindTransactionById;
let transactionId1: any;
let transactionId2: any;

describe('FindTransactionsById', () => {
  beforeEach(() => {
    transactionRepository = new FakeTransactionRepository();
    transactionId1 = uuidv4();
    transactionId2 = uuidv4();
  });

  it('should list transaction with right id', async () => {
    const transactionData1 = new TransactionBuilder(transactionId1).build();
    const transactionData2 = new TransactionBuilder(transactionId2).build();

    await transactionRepository.save(transactionData1);
    await transactionRepository.save(transactionData2);

    findTransactionById = new FindTransactionById(transactionRepository, {params: transactionData1});

    const result = await findTransactionById.execute();

    expect(result).toBe(transactionData1)
  });

  it('should list no user if id does not exist in database', async () => {
    const transactionData1 = new TransactionBuilder(transactionId1).build();
    const transactionData2 = new TransactionBuilder(transactionId2).build();
    
    const transactionDatas = [transactionData1, transactionData2];
    transactionDatas.map(async op => await transactionRepository.save(op))

    const transactionId3 = uuidv4()

    findTransactionById = new FindTransactionById(transactionRepository, {params: {id: transactionId3}});

    const result = await findTransactionById.execute();

    expect(result).toHaveProperty('code')
  });
});