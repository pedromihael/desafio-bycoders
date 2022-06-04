import { Operations } from "~/entity/Operations";
import { AppDataSource } from "~/infrastructure/interface/database/data-source";
import { IOperationRepository } from "./IOperationRepository";

export class PostgresOperationRepository implements IOperationRepository {

  private operationRepository = AppDataSource.getRepository(Operations)

  async save(operation: Operations): Promise<Operations> {
    return this.operationRepository.save(operation)
  }

  async find(): Promise<Operations[]> {
    return this.operationRepository.find()
  }

  async findOneBy(condition: Object): Promise<Operations> {
    return this.operationRepository.findOneBy(condition)
  }

  async remove(operation: Operations): Promise<Operations> {
    return this.operationRepository.findOneBy(operation)
  }

}