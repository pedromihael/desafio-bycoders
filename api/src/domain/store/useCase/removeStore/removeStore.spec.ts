import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeStoreRepository } from '../../repository/FakeStoreRepository';
import { IStoreRepository } from '../../repository/IStoreRepository';
import { RemoveStore } from './removeStore';
import { StoreBuilder } from '../../builder/StoreBuilder';
import { FindStoreById } from '../findStoreById/findStoreById';

let storeRepository: IStoreRepository;
let removeStore: RemoveStore;
let findStoreById: FindStoreById
let storeId1: any;
let storeId2: any;

describe('RemoveStore', () => {
  beforeEach(() => {
    storeRepository = new FakeStoreRepository();
    storeId1 = uuidv4();
    storeId2 = uuidv4();
  });

  it('should list stores without removed store', async () => {
    const storeData1 = new StoreBuilder(storeId1).build();
    const storeData2 = new StoreBuilder(storeId2).build();

    await storeRepository.save(storeData1);
    await storeRepository.save(storeData2);

    removeStore = new RemoveStore(storeRepository, {params: storeData1});

    await removeStore.execute();

    findStoreById = new FindStoreById(storeRepository, {params: storeData1})
    const result = await findStoreById.execute()

    expect(result).toHaveProperty('code')
  });

});