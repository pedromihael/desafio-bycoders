import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeStoreRepository } from '../../repository/FakeStoreRepository';
import { IStoreRepository } from '../../repository/IStoreRepository';
import { FindsertStoreByName } from './findsertStoreByName';
import { StoreBuilder } from '../../builder/StoreBuilder';
import { OwnerBuilder } from '../../../../domain/owner/builder/OwnerBuilder';

let storeRepository: IStoreRepository;
let findStoreByName: FindsertStoreByName;
let storeName1: any;
let storeName2: any;
let ownerId: any;

describe('FindsertStoresByName', () => {
  beforeEach(() => {
    storeRepository = new FakeStoreRepository();
    storeName1 = uuidv4();
    storeName2 = uuidv4();
    ownerId = uuidv4();
  });

  it('should list store with right name', async () => {
    new OwnerBuilder(ownerId).build()
    const storeData1 = new StoreBuilder(storeName1).setOwnerId(ownerId).build();
    const storeData2 = new StoreBuilder(storeName2).setOwnerId(ownerId).build();

    await storeRepository.save(storeData1);
    await storeRepository.save(storeData2);

    findStoreByName = new FindsertStoreByName(storeRepository, storeData1.name, ownerId);

    const result = await findStoreByName.execute();

    expect(result).toBe(storeData1)
  });
});