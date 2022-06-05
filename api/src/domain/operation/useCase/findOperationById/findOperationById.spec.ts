import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeOperationRepository } from '../../repository/FakeOperationRepository';
import { IOperationRepository } from '../../repository/IOperationRepository';
import { FindOperationById } from './findOperationById';
import { OperationBuilder } from '../../builder/OperationBuilder';

let operationRepository: IOperationRepository;
let findOperationById: FindOperationById;
let operationId1: any;
let operationId2: any;

describe('FindAllOperations', () => {
  beforeEach(() => {
    operationRepository = new FakeOperationRepository();
    operationId1 = uuidv4();
    operationId2 = uuidv4();
  });

  it('should list operation with right id', async () => {
    const operationData1 = new OperationBuilder(operationId1).build();
    const operationData2 = new OperationBuilder(operationId2).build();

    await operationRepository.save(operationData1);
    await operationRepository.save(operationData2);

    findOperationById = new FindOperationById(operationRepository, {params: operationData1});

    const result = await findOperationById.execute();

    expect(result).toBe(operationData1)
  });

  it('should list no user if id does not exist in database', async () => {
    const operationData1 = new OperationBuilder(operationId1).build();
    const operationData2 = new OperationBuilder(operationId2).build();
    
    const operationDatas = [operationData1, operationData2];
    operationDatas.map(async op => await operationRepository.save(op))

    const operationId3 = uuidv4()

    findOperationById = new FindOperationById(operationRepository, {params: {id: operationId3}});

    const result = await findOperationById.execute();

    expect(result).toHaveProperty('code')
  });
});