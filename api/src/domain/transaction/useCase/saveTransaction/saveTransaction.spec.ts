import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeTransactionRepository } from '../../repository/FakeTransactionRepository';
import { ITransactionRepository } from '../../repository/ITransactionRepository';
import { SaveTransaction } from './saveTransaction';
import { TransactionBuilder } from '../../builder/TransactionBuilder';
import { FindAllTransactions } from '../findAllTransactions/findAllTransactions';

let transactionRepository: ITransactionRepository;
let saveTransaction1: SaveTransaction;
let saveTransaction2: SaveTransaction;
let findAllTransactions: FindAllTransactions
let transactionId1: any;
let transactionId2: any;
let transactionId3: any;

describe('SaveTransaction', () => {
  beforeEach(() => {
    transactionRepository = new FakeTransactionRepository();
    transactionId1 = uuidv4();
    transactionId2 = uuidv4();
    transactionId3 = uuidv4();
  });

  it('should save transaction and list saved transactions', async () => {
    const transactionData1 = new TransactionBuilder(transactionId1).build();
    const transactionData2 = new TransactionBuilder(transactionId2).build();
    const transactionData3 = new TransactionBuilder(transactionId3).build();

    const transactionsArray = [transactionData1, transactionData2]
    
    saveTransaction1 = new SaveTransaction(transactionRepository, { body: transactionData1 }, {store_id: 'any store id'});
    saveTransaction2 = new SaveTransaction(transactionRepository, { body: transactionData2 }, {store_id: 'any store id'});
    
    const result1 = await saveTransaction1.execute()
    const result2 = await saveTransaction2.execute()
    
    const results = [result1, result2]

    findAllTransactions = new FindAllTransactions(transactionRepository)
    const allTransactions = await findAllTransactions.execute()

    expect(results).toEqual(transactionsArray)
    expect(allTransactions).toEqual(transactionsArray)
    expect(results).not.toEqual(expect.arrayContaining([transactionData3]))
    expect(allTransactions).not.toEqual(expect.arrayContaining([transactionData3]))
  });

});