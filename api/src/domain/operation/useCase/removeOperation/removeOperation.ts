import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Operations } from "@entity/Operations"

export class RemoveOperation {
  private operationRepository = AppDataSource.getRepository(Operations)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    const operationToRemove = await this.operationRepository.findOneBy({ id: this.request.params.id })
    if (operationToRemove) {
      try {
        return this.operationRepository.remove(operationToRemove)
      } catch (error) {
        return error
      }
    } else return null
  }

}