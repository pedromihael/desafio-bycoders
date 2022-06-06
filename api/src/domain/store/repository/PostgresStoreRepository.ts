import { Stores } from "~/entity/Stores";
import { AppDataSource } from "~/infrastructure/interface/database/data-source";
import { IStoreRepository } from "./IStoreRepository";

export class PostgresStoreRepository implements IStoreRepository {

  private storeRepository = AppDataSource.getRepository(Stores)

  async save(store: Stores): Promise<Stores> {
    return this.storeRepository.save(store)
  }

  async find(): Promise<Stores[]> {
    return this.storeRepository.find()
  }

  async findOneBy(condition: Object): Promise<Stores> {
    return this.storeRepository.findOneBy(condition)
  }

  async remove(store: Stores): Promise<Stores> {
    return this.storeRepository.findOneBy(store)
  }

  async update(identification: Object, payload: Object): Promise<any> | null {
    return this.storeRepository.update(identification, payload)
  }

}