import 'reflect-metadata';
import { Operations } from "@entity/Operations"
import { autoInjectable, inject } from "tsyringe"
import { IOperationRepository } from "../../repository/IOperationRepository"

@autoInjectable()
export class FindAllOperations {
  constructor(@inject('OperationRepository') private operationRepository: IOperationRepository) {}

  async execute(): Promise<Operations[]> | null {
    return this.operationRepository.find()
  }

}