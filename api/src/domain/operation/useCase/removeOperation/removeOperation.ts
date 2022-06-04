import 'reflect-metadata';
import { Request } from 'express';
import { autoInjectable, inject } from "tsyringe"
import { IOperationRepository } from "../../repository/IOperationRepository"
import { Operations } from '~/entity/Operations';

@autoInjectable()
export class RemoveOperation {
  
  constructor(@inject('OperationRepository') private operationRepository: IOperationRepository, request: Request) {
    this.request = request
  }
  
  private request: Request
  
  async execute(): Promise<Operations | any> {
    const operationToRemove = await this.operationRepository.findOneBy({ id: this.request.params.id })
    if (operationToRemove) {
      try {
        const operation = await this.operationRepository.remove(operationToRemove)
        if (!operation) {
          return {
            code: 404,
            entity: "Operation",
            message: `Operation with id ${this.request.params.id} not removed.`
          }
        } return operation
      } catch (error) {
        return error
      }
    } else return null
  }

}