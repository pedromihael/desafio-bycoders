import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeOperationRepository } from '../../repository/FakeOperationRepository';
import { IOperationRepository } from '../../repository/IOperationRepository';
import { FindAllOperations } from './findAllOperations';
import { OperationBuilder } from '../../builder/OperationBuilder';

let operationRepository: IOperationRepository;
let findAllOperations: FindAllOperations;
let operationId1: any;
let operationId2: any;

describe('FindAllOperations', () => {
  beforeEach(() => {
    operationRepository = new FakeOperationRepository();
    findAllOperations = new FindAllOperations(operationRepository);
    operationId1 = uuidv4();
    operationId2 = uuidv4();
  });

  it('should list all operations there is operations in database', async () => {
    const operationData1 = new OperationBuilder(operationId1).build();
    const operationData2 = new OperationBuilder(operationId2).build();

    await operationRepository.save(operationData1);
    await operationRepository.save(operationData2);

    const result = await findAllOperations.execute();

    expect(result).toHaveLength(2)
    result.map(r => {
      expect(r).toBeInstanceOf(Object)
    })
  });

  it('should list no user if there is no content in database', async () => {
    const operationData1 = new OperationBuilder(operationId1).build();
    const operationData2 = new OperationBuilder(operationId2).build();
    const operationDatas = [operationData1, operationData2];

    const result = await findAllOperations.execute();

    expect(result).not.toEqual(expect.arrayContaining(operationDatas));
  });
});