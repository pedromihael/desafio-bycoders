import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeStoreRepository } from '../../repository/FakeStoreRepository';
import { IStoreRepository } from '../../repository/IStoreRepository';
import { FindAllStores } from './findAllStores';
import { StoreBuilder } from '../../builder/StoreBuilder';

let storeRepository: IStoreRepository;
let findAllStores: FindAllStores;
let storeId1: any;
let storeId2: any;

describe('FindAllStores', () => {
  beforeEach(() => {
    storeRepository = new FakeStoreRepository();
    findAllStores = new FindAllStores(storeRepository);
    storeId1 = uuidv4();
    storeId2 = uuidv4();
  });

  it('should list all stores there is stores in database', async () => {
    const storeData1 = new StoreBuilder(storeId1).build();
    const storeData2 = new StoreBuilder(storeId2).build();

    await storeRepository.save(storeData1);
    await storeRepository.save(storeData2);

    const result = await findAllStores.execute();

    expect(result).toHaveLength(2)
    result.map(r => {
      expect(r).toBeInstanceOf(Object)
    })
  });

  it('should list no user if there is no content in database', async () => {
    const storeData1 = new StoreBuilder(storeId1).build();
    const storeData2 = new StoreBuilder(storeId2).build();
    const storeDatas = [storeData1, storeData2];

    const result = await findAllStores.execute();

    expect(result).not.toEqual(expect.arrayContaining(storeDatas));
  });
});