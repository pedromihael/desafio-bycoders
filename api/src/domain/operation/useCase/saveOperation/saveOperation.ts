import 'reflect-metadata';
import { Request } from 'express';
import { autoInjectable, inject } from "tsyringe"
import { IOperationRepository } from "../../repository/IOperationRepository"
import { Operations } from '~/entity/Operations';

@autoInjectable()
export class SaveOperation {
  
  constructor(@inject('OperationRepository') private operationRepository: IOperationRepository, request: Request | any) {
    this.request = request
  }
  
  private request: Request

  async execute(): Promise<Operations | any> {
    try {
      const operation: Operations = this.request.body
      const result = await this.operationRepository.save(operation)
      if (result.id) {
        return result
      } else {
        return {
          code: 304,
          entity: "Operation",
          message: `Operation not created. Check the body request.`
        }
      }
    } catch (error) {
      return error
    }
  }

}