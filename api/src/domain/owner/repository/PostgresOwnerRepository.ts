import { Owners } from "~/entity/Owners";
import { AppDataSource } from "~/infrastructure/interface/database/data-source";
import { IOwnerRepository } from "./IOwnerRepository";

export class PostgresOwnerRepository implements IOwnerRepository {

  private ownerRepository = AppDataSource.getRepository(Owners)

  async save(operation: Owners): Promise<Owners> {
    return this.ownerRepository.save(operation)
  }

  async find(): Promise<Owners[]> {
    return this.ownerRepository.find()
  }

  async findOneBy(condition: Object): Promise<Owners> {
    return this.ownerRepository.findOneBy(condition)
  }

  async remove(operation: Owners): Promise<Owners> {
    return this.ownerRepository.findOneBy(operation)
  }

}