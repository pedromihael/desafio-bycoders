import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeOwnerRepository } from '../../repository/FakeOwnerRepository';
import { IOwnerRepository } from '../../repository/IOwnerRepository';
import { SaveOwner } from './saveOwner';
import { OwnerBuilder } from '../../builder/OwnerBuilder';
import { FindAllOwners } from '../findAllOwners/findAllOwners';

let ownerRepository: IOwnerRepository;
let saveOwner1: SaveOwner;
let saveOwner2: SaveOwner;
let findAllOwners: FindAllOwners
let ownerId1: any;
let ownerId2: any;
let ownerId3: any;

describe('SaveOwner', () => {
  beforeEach(() => {
    ownerRepository = new FakeOwnerRepository();
    ownerId1 = uuidv4();
    ownerId2 = uuidv4();
    ownerId3 = uuidv4();
  });

  it('should save owner and list saved owners', async () => {
    const ownerData1 = new OwnerBuilder(ownerId1).build();
    const ownerData2 = new OwnerBuilder(ownerId2).build();
    const ownerData3 = new OwnerBuilder(ownerId3).build();

    const ownersArray = [ownerData1, ownerData2]
    
    saveOwner1 = new SaveOwner(ownerRepository, { body: ownerData1 });
    saveOwner2 = new SaveOwner(ownerRepository, { body: ownerData2 });
    
    const result1 = await saveOwner1.execute()
    const result2 = await saveOwner2.execute()
    
    const results = [result1, result2]

    findAllOwners = new FindAllOwners(ownerRepository)
    const allOwners = await findAllOwners.execute()

    expect(results).toEqual(expect.arrayContaining(ownersArray))
    expect(allOwners).toEqual(expect.arrayContaining(ownersArray))
    expect(results).not.toEqual(expect.arrayContaining([ownerData3]))
    expect(allOwners).not.toEqual(expect.arrayContaining([ownerData3]))
  });

});