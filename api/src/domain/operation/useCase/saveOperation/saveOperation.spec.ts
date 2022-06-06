import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeOperationRepository } from '../../repository/FakeOperationRepository';
import { IOperationRepository } from '../../repository/IOperationRepository';
import { SaveOperation } from './saveOperation';
import { OperationBuilder } from '../../builder/OperationBuilder';
import { FindAllOperations } from '../findAllOperations/findAllOperations';

let operationRepository: IOperationRepository;
let saveOperation1: SaveOperation;
let saveOperation2: SaveOperation;
let findAllOperations: FindAllOperations
let operationId1: any;
let operationId2: any;
let operationId3: any;

describe('SaveOperation', () => {
  beforeEach(() => {
    operationRepository = new FakeOperationRepository();
    operationId1 = uuidv4();
    operationId2 = uuidv4();
    operationId3 = uuidv4();
  });

  it('should save operation and list saved operations', async () => {
    const operationData1 = new OperationBuilder(operationId1).build();
    const operationData2 = new OperationBuilder(operationId2).build();
    const operationData3 = new OperationBuilder(operationId3).build();

    const operationsArray = [operationData1, operationData2]
    
    saveOperation1 = new SaveOperation(operationRepository, { body: operationData1 });
    saveOperation2 = new SaveOperation(operationRepository, { body: operationData2 });
    
    const result1 = await saveOperation1.execute()
    const result2 = await saveOperation2.execute()
    
    const results = [result1, result2]

    findAllOperations = new FindAllOperations(operationRepository)
    const allOperations = await findAllOperations.execute()

    expect(results).toEqual(expect.arrayContaining(operationsArray))
    expect(allOperations).toEqual(expect.arrayContaining(operationsArray))
    expect(results).not.toEqual(expect.arrayContaining([operationData3]))
    expect(allOperations).not.toEqual(expect.arrayContaining([operationData3]))
  });

});