import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeStoreRepository } from '../../repository/FakeStoreRepository';
import { IStoreRepository } from '../../repository/IStoreRepository';
import { UpdateStoreCash } from './updateStoreCashUseCase';
import { StoreBuilder } from '../../builder/StoreBuilder';
import { FindAllStores } from '../findAllStores/findAllStores';

let storeRepository: IStoreRepository;
let storeId1: any;

describe('UpdateStoreCash', () => {
  beforeEach(() => {
    storeRepository = new FakeStoreRepository();
    storeId1 = uuidv4();
  });

  it('should update store cash and return correct value', async () => {
    const storeDataStg1 = new StoreBuilder(storeId1).build()
    
    // 0.0
    const storeDataStg2 = new UpdateStoreCash(storeRepository, { body: {...storeDataStg1, id: storeId1} }, 'any onwner id');
    const result1 = await storeDataStg2.execute() // 0.0

    // 2.2
    const storeDataStg3 = new UpdateStoreCash(storeRepository, { body: {value: 2.2, store: storeId1, id: storeId1} }, 'any onwner id');
    const result2 = await storeDataStg3.execute() // 2.2

    console.log('result1, result2', result1, result2)

    expect(result1.id).toBe(result2.id)
    expect(result1.cash).toBe(0)
    expect(result2.cash).toBe(2.2)

  });

});