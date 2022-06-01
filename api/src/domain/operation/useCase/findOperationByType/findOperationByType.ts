import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Operations } from "@entity/Operations"

export class FindOperationByType {
  private operationRepository = AppDataSource.getRepository(Operations)
  private type: number

  constructor(type: number) {
    this.type = type
  }

  async execute() {
    return this.operationRepository.findOne({where: {type: this.type}})
  }

}