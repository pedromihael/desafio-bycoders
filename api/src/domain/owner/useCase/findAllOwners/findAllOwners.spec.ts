import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeOwnerRepository } from '../../repository/FakeOwnerRepository';
import { IOwnerRepository } from '../../repository/IOwnerRepository';
import { FindAllOwners } from './findAllOwners';
import { OwnerBuilder } from '../../builder/OwnerBuilder';

let ownerRepository: IOwnerRepository;
let findAllOwners: FindAllOwners;
let ownerId1: any;
let ownerId2: any;

describe('FindAllOwners', () => {
  beforeEach(() => {
    ownerRepository = new FakeOwnerRepository();
    findAllOwners = new FindAllOwners(ownerRepository);
    ownerId1 = uuidv4();
    ownerId2 = uuidv4();
  });

  it('should list all owners there is owners in database', async () => {
    const ownerData1 = new OwnerBuilder(ownerId1).build();
    const ownerData2 = new OwnerBuilder(ownerId2).build();

    await ownerRepository.save(ownerData1);
    await ownerRepository.save(ownerData2);

    const result = await findAllOwners.execute();

    expect(result).toHaveLength(2)
    result.map(r => {
      expect(r).toBeInstanceOf(Object)
    })
  });

  it('should list no user if there is no content in database', async () => {
    const ownerData1 = new OwnerBuilder(ownerId1).build();
    const ownerData2 = new OwnerBuilder(ownerId2).build();
    const ownerDatas = [ownerData1, ownerData2];

    const result = await findAllOwners.execute();

    expect(result).not.toEqual(expect.arrayContaining(ownerDatas));
  });
});