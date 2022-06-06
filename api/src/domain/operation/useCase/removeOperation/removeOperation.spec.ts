import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeOperationRepository } from '../../repository/FakeOperationRepository';
import { IOperationRepository } from '../../repository/IOperationRepository';
import { RemoveOperation } from './removeOperation';
import { OperationBuilder } from '../../builder/OperationBuilder';
import { FindOperationById } from '../findOperationById/findOperationById';

let operationRepository: IOperationRepository;
let removeOperation: RemoveOperation;
let findOperationById: FindOperationById
let operationId1: any;
let operationId2: any;

describe('RemoveOperation', () => {
  beforeEach(() => {
    operationRepository = new FakeOperationRepository();
    operationId1 = uuidv4();
    operationId2 = uuidv4();
  });

  it('should list operations without removed operation', async () => {
    const operationData1 = new OperationBuilder(operationId1).build();
    const operationData2 = new OperationBuilder(operationId2).build();

    await operationRepository.save(operationData1);
    await operationRepository.save(operationData2);

    removeOperation = new RemoveOperation(operationRepository, {params: operationData1});

    await removeOperation.execute();

    findOperationById = new FindOperationById(operationRepository, {params: operationData1})
    const result = await findOperationById.execute()

    expect(result).toHaveProperty('code')
  });

});