import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import { FakeOperationRepository } from '../../repository/FakeOperationRepository';
import { IOperationRepository } from '../../repository/IOperationRepository';
import { FindOperationByType } from './findOperationByType';
import { OperationBuilder } from '../../builder/OperationBuilder';

let operationRepository: IOperationRepository;
let findOperationByType: FindOperationByType;
let operationType1: any;
let operationType2: any;

describe('FindOperationsByType', () => {
  beforeEach(() => {
    operationRepository = new FakeOperationRepository();
    operationType1 = uuidv4();
    operationType2 = uuidv4();
  });

  it('should list operation with right type', async () => {
    const operationData1 = new OperationBuilder(operationType1).build();
    const operationData2 = new OperationBuilder(operationType2).build();

    await operationRepository.save(operationData1);
    await operationRepository.save(operationData2);

    findOperationByType = new FindOperationByType(operationRepository, operationData1.type);

    const result = await findOperationByType.execute();

    expect(result).toBe(operationData1)
  });

  it('should list no user if type does not exist in database', async () => {
    const operationData1 = new OperationBuilder(operationType1).build();
    const operationData2 = new OperationBuilder(operationType2).build();
    
    const operationDatas = [operationData1, operationData2];
    operationDatas.map(async op => await operationRepository.save(op))

    const operationId3 = uuidv4()
    const operationData3 = new OperationBuilder(operationId3).setType(999).build()

    findOperationByType = new FindOperationByType(operationRepository, operationData3.type);

    const result = await findOperationByType.execute();

    expect(result).toHaveProperty('code')
  });
});