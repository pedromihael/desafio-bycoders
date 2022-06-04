import 'reflect-metadata';
import { Request } from 'express';
import { autoInjectable, inject } from "tsyringe"
import { IOperationRepository } from "../../repository/IOperationRepository"
import { Operations } from '~/entity/Operations';
import { IOperations } from '../../model/IOperations'
import { keys } from 'ts-transformer-keys'
import { isInstanceOf } from "@shared/helper/instanceOf"

@autoInjectable()
export class SaveOperation {
  
  constructor(@inject('OperationRepository') private operationRepository: IOperationRepository, request: Request) {
    this.request = request
  }
  
  private request: Request

  async execute(): Promise<Operations | any> {
    try {
      const operation: Operations = this.request.body
      if (isInstanceOf(operation, keys<IOperations>())) {
        return this.operationRepository.save(operation)
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