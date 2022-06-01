import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Operations } from "@entity/Operations"
import { IOperations } from '../../model/IOperations'
import { keys } from 'ts-transformer-keys'
import { isInstanceOf } from "@shared/helper/instanceOf"

export class SaveOperation {
  private operationRepository = AppDataSource.getRepository(Operations)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
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