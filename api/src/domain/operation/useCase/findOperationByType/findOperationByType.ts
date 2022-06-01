import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Operations } from "@entity/Operations"

export class FindOperationByType {
  private operationRepository = AppDataSource.getRepository(Operations)
  private type: number

  constructor(type: number) {
    this.type = type
  }

  async execute() {
    const operation = await this.operationRepository.findOne({ where: { type: this.type } })
    if (!operation) { 
      return {
        code: 404,
        entity: "Operation",
        message: `Operation with type ${this.type} not found.`
      }
    }
    return operation
  }

}