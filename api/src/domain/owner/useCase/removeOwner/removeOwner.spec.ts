import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeOwnerRepository } from '../../repository/FakeOwnerRepository';
import { IOwnerRepository } from '../../repository/IOwnerRepository';
import { RemoveOwner } from './removeOwner';
import { OwnerBuilder } from '../../builder/OwnerBuilder';
import { FindOwnerById } from '../findOwnerById/findOwnerById';

let ownerRepository: IOwnerRepository;
let removeOwner: RemoveOwner;
let findOwnerById: FindOwnerById
let ownerId1: any;
let ownerId2: any;

describe('RemoveOwner', () => {
  beforeEach(() => {
    ownerRepository = new FakeOwnerRepository();
    ownerId1 = uuidv4();
    ownerId2 = uuidv4();
  });

  it('should list owners without removed owner', async () => {
    const ownerData1 = new OwnerBuilder(ownerId1).build();
    const ownerData2 = new OwnerBuilder(ownerId2).build();

    await ownerRepository.save(ownerData1);
    await ownerRepository.save(ownerData2);

    removeOwner = new RemoveOwner(ownerRepository, {params: ownerData1});

    await removeOwner.execute();

    findOwnerById = new FindOwnerById(ownerRepository, {params: ownerData1})
    const result = await findOwnerById.execute()

    expect(result).toHaveProperty('code')
  });

});