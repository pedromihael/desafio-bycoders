import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeTransactionRepository } from '../../repository/FakeTransactionRepository';
import { ITransactionRepository } from '../../repository/ITransactionRepository';
import { RemoveTransaction } from './removeTransaction';
import { TransactionBuilder } from '../../builder/TransactionBuilder';
import { FindTransactionById } from '../findTransactionById/findTransactionById';

let transactionRepository: ITransactionRepository;
let removeTransaction: RemoveTransaction;
let findTransactionById: FindTransactionById
let transactionId1: any;
let transactionId2: any;

describe('RemoveTransaction', () => {
  beforeEach(() => {
    transactionRepository = new FakeTransactionRepository();
    transactionId1 = uuidv4();
    transactionId2 = uuidv4();
  });

  it('should list transactions without removed transaction', async () => {
    const transactionData1 = new TransactionBuilder(transactionId1).build();
    const transactionData2 = new TransactionBuilder(transactionId2).build();

    await transactionRepository.save(transactionData1);
    await transactionRepository.save(transactionData2);

    removeTransaction = new RemoveTransaction(transactionRepository, {params: transactionData1});

    await removeTransaction.execute();

    findTransactionById = new FindTransactionById(transactionRepository, {params: transactionData1})
    const result = await findTransactionById.execute()

    expect(result).toHaveProperty('code')
  });

});