import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Operations } from "@entity/Operations"

export class FindAllOperations {
  private operationRepository = AppDataSource.getRepository(Operations)

  async execute() {
    return this.operationRepository.find()
  }

}