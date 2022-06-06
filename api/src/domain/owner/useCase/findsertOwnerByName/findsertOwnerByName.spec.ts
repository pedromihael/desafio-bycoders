import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeOwnerRepository } from '../../repository/FakeOwnerRepository';
import { IOwnerRepository } from '../../repository/IOwnerRepository';
import { FindsertOwnerByName } from './findsertOwnerByName';
import { OwnerBuilder } from '../../builder/OwnerBuilder';

let ownerRepository: IOwnerRepository;
let findOwnerByName: FindsertOwnerByName;
let ownerName1: any;
let ownerName2: any;

describe('FindsertOwnersByName', () => {
  beforeEach(() => {
    ownerRepository = new FakeOwnerRepository();
    ownerName1 = uuidv4();
    ownerName2 = uuidv4();
  });

  it('should list owner with right name', async () => {
    const ownerData1 = new OwnerBuilder(ownerName1).build();
    const ownerData2 = new OwnerBuilder(ownerName2).build();

    await ownerRepository.save(ownerData1);
    await ownerRepository.save(ownerData2);

    findOwnerByName = new FindsertOwnerByName(ownerRepository, ownerData1.name);

    const result = await findOwnerByName.execute();

    expect(result).toBe(ownerData1)
  });
});