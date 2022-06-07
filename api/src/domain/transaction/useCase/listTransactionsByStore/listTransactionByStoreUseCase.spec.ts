import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeTransactionRepository } from '../../repository/FakeTransactionRepository';
import { ITransactionRepository } from '../../repository/ITransactionRepository';
import { ListTransactionsByStore } from './listTransactionsByStoreUseCase';
import { TransactionBuilder } from '../../builder/TransactionBuilder';
import { IStoreRepository } from '../../../../domain/store/repository/IStoreRepository';
import { IOperationRepository } from '../../../../domain/operation/repository/IOperationRepository';
import { FakeStoreRepository } from '../../../../domain/store/repository/FakeStoreRepository';
import { FakeOperationRepository } from '../../../../domain/operation/repository/FakeOperationRepository';
import { StoreBuilder } from '../../../../domain/store/builder/StoreBuilder';
import { OperationBuilder } from '../../../../domain/operation/builder/OperationBuilder';

let transactionRepository: ITransactionRepository;
let storeRepository: IStoreRepository;
let operationRepository: IOperationRepository;
let listTransactionsByStore: ListTransactionsByStore;
let transactionId1: any;
let transactionId2: any;

describe('ListTransactionsByStore', () => {
  beforeEach(() => {
    transactionRepository = new FakeTransactionRepository();
    storeRepository = new FakeStoreRepository();
    operationRepository = new FakeOperationRepository();
    listTransactionsByStore = new ListTransactionsByStore(transactionRepository, storeRepository, operationRepository);
    transactionId1 = uuidv4();
  });

  it('should list all transactions there is transactions in database', async () => {
    const transactionData1 = new TransactionBuilder(transactionId1)
      .setStoreId('dummy_store_id')
      .setOperationType(0)
      .build()
    const transactionData2 = new TransactionBuilder(transactionId2)
      .setStoreId('dummy_store_id')
      .setOperationType(0)
      .build()
    const storeData = new StoreBuilder('dummy_store_id').build()
    const operationData = new OperationBuilder('dummy_operation_id')
      .setType(0)
      .build()

    await storeRepository.save(storeData)
    await operationRepository.save(operationData)
    await transactionRepository.save(transactionData1);
    await transactionRepository.save(transactionData2);

    const result = await listTransactionsByStore.execute();

    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('operations')
    expect(result[0]).toHaveProperty('storeName')
    expect(result[0]).toHaveProperty('cash')

  });
});