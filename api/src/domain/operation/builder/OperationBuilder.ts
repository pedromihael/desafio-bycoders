import { OperationSign } from '../../../entity/Operations';
import { IOperations } from '../model/IOperations';


export class OperationBuilder {
  private operationData: IOperations;

  constructor(id: string) {
    this.operationData = {
      _id: id,
      description: 'any description',
      type: 0,
      kind: 'any kind',
      sign: OperationSign.INCOME
    };
  }

  public setDescription(description: string) {
    this.operationData.description = description;
    return this;
  }

  public setType(type: number) {
    this.operationData.type = type;
    return this;
  }

  public setKind(kind: string) {
    this.operationData.kind = kind;
    return this;
  }

  public setSign(sign: OperationSign) {
    this.operationData.sign = sign;
    return this;
  }

  public build() {
    return this.operationData;
  }
}
