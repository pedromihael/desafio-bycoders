import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeStoreRepository } from '../../repository/FakeStoreRepository';
import { IStoreRepository } from '../../repository/IStoreRepository';
import { FindStoreById } from './findStoreById';
import { StoreBuilder } from '../../builder/StoreBuilder';

let storeRepository: IStoreRepository;
let findStoreById: FindStoreById;
let storeId1: any;
let storeId2: any;

describe('FindStoresById', () => {
  beforeEach(() => {
    storeRepository = new FakeStoreRepository();
    storeId1 = uuidv4();
    storeId2 = uuidv4();
  });

  it('should list store with right id', async () => {
    const storeData1 = new StoreBuilder(storeId1).build();
    const storeData2 = new StoreBuilder(storeId2).build();

    await storeRepository.save(storeData1);
    await storeRepository.save(storeData2);

    findStoreById = new FindStoreById(storeRepository, {params: storeData1});

    const result = await findStoreById.execute();

    expect(result).toBe(storeData1)
  });

  it('should list no user if id does not exist in database', async () => {
    const storeData1 = new StoreBuilder(storeId1).build();
    const storeData2 = new StoreBuilder(storeId2).build();
    
    const storeDatas = [storeData1, storeData2];
    storeDatas.map(async op => await storeRepository.save(op))

    const storeId3 = uuidv4()

    findStoreById = new FindStoreById(storeRepository, {params: {id: storeId3}});

    const result = await findStoreById.execute();

    expect(result).toHaveProperty('code')
  });
});