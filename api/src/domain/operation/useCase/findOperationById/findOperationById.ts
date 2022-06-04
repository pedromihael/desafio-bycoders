import 'reflect-metadata';
import { autoInjectable, inject } from "tsyringe"
import { IOperationRepository } from "../../repository/IOperationRepository"
import { Request } from "express"
import { Operations } from '~/entity/Operations';

@autoInjectable()
export class FindOperationById {
  
  constructor(@inject('OperationRepository') private operationRepository: IOperationRepository, request: Request) {
    this.request = request
  }

  private request: Request

  async execute(): Promise<Operations | any> {
    const operation = await this.operationRepository.findOneBy({ id: this.request.params.id })
    if (!operation) {
      return {
        code: 404,
        entity: "Operation",
        message: `Operation with id ${this.request.params.id} not found.`
      }
    } return operation
  }

}