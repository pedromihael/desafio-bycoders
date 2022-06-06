import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeStoreRepository } from '../../repository/FakeStoreRepository';
import { IStoreRepository } from '../../repository/IStoreRepository';
import { SaveStore } from './saveStore';
import { StoreBuilder } from '../../builder/StoreBuilder';
import { FindAllStores } from '../findAllStores/findAllStores';

let storeRepository: IStoreRepository;
let saveStore1: SaveStore;
let saveStore2: SaveStore;
let findAllStores: FindAllStores
let storeId1: any;
let storeId2: any;
let storeId3: any;

describe('SaveStore', () => {
  beforeEach(() => {
    storeRepository = new FakeStoreRepository();
    storeId1 = uuidv4();
    storeId2 = uuidv4();
    storeId3 = uuidv4();
  });

  it('should save store and list saved stores', async () => {
    const storeData1 = new StoreBuilder(storeId1).build();
    const storeData2 = new StoreBuilder(storeId2).build();
    const storeData3 = new StoreBuilder(storeId3).build();

    const storesArray = [storeData1, storeData2]
    
    saveStore1 = new SaveStore(storeRepository, { body: storeData1 });
    saveStore2 = new SaveStore(storeRepository, { body: storeData2 });
    
    const result1 = await saveStore1.execute()
    const result2 = await saveStore2.execute()
    
    const results = [result1, result2]

    findAllStores = new FindAllStores(storeRepository)
    const allStores = await findAllStores.execute()

    expect(results).toEqual(expect.arrayContaining(storesArray))
    expect(allStores).toEqual(expect.arrayContaining(storesArray))
    expect(results).not.toEqual(expect.arrayContaining([storeData3]))
    expect(allStores).not.toEqual(expect.arrayContaining([storeData3]))
  });

});