import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeOwnerRepository } from '../../repository/FakeOwnerRepository';
import { IOwnerRepository } from '../../repository/IOwnerRepository';
import { FindOwnerById } from './findOwnerById';
import { OwnerBuilder } from '../../builder/OwnerBuilder';

let ownerRepository: IOwnerRepository;
let findOwnerById: FindOwnerById;
let ownerId1: any;
let ownerId2: any;

describe('FindOwnersById', () => {
  beforeEach(() => {
    ownerRepository = new FakeOwnerRepository();
    ownerId1 = uuidv4();
    ownerId2 = uuidv4();
  });

  it('should list owner with right id', async () => {
    const ownerData1 = new OwnerBuilder(ownerId1).build();
    const ownerData2 = new OwnerBuilder(ownerId2).build();

    await ownerRepository.save(ownerData1);
    await ownerRepository.save(ownerData2);

    findOwnerById = new FindOwnerById(ownerRepository, {params: ownerData1});

    const result = await findOwnerById.execute();

    expect(result).toBe(ownerData1)
  });

  it('should list no user if id does not exist in database', async () => {
    const ownerData1 = new OwnerBuilder(ownerId1).build();
    const ownerData2 = new OwnerBuilder(ownerId2).build();
    
    const ownerDatas = [ownerData1, ownerData2];
    ownerDatas.map(async op => await ownerRepository.save(op))

    const ownerId3 = uuidv4()

    findOwnerById = new FindOwnerById(ownerRepository, {params: {id: ownerId3}});

    const result = await findOwnerById.execute();

    expect(result).toHaveProperty('code')
  });
});