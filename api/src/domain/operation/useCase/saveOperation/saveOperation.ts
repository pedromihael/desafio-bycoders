import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Operations } from "@entity/Operations"

export class SaveOperation {
  private operationRepository = AppDataSource.getRepository(Operations)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    return this.operationRepository.save(this.request.body)
  }

}