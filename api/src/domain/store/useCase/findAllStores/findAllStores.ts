import 'reflect-metadata';
import { Stores } from "@entity/Stores"
import { autoInjectable, inject } from "tsyringe"
import { IStoreRepository } from "../../repository/IStoreRepository"

@autoInjectable()
export class FindAllStores {
  constructor(@inject('StoreRepository') private storeRepository: IStoreRepository) {}

  async execute(): Promise<Stores[]> | null {
    return this.storeRepository.find()
  }

}