import 'reflect-metadata';
import { autoInjectable, inject } from "tsyringe"
import { Operations } from '~/entity/Operations';
import { IOperationRepository } from "../../repository/IOperationRepository"

@autoInjectable()
export class FindOperationByType {
  
  constructor(@inject('OperationRepository') private operationRepository: IOperationRepository, type: number) {
    this.type = type
  }

  private type: number

  async execute(): Promise<Operations | any> {
    const operation = await this.operationRepository.findOneBy({ type: this.type })
    if (!operation) { 
      return {
        code: 404,
        entity: "Operation",
        message: `Operation with type ${this.type} not found.`
      }
    }
    return operation
  }

}