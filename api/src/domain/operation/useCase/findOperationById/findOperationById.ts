import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Operations } from "@entity/Operations"

export class FindOperationById {
  private operationRepository = AppDataSource.getRepository(Operations)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    return this.operationRepository.findOne({where: {id: this.request.params.id}})
  }

}