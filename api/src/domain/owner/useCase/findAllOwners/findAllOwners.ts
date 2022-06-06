import 'reflect-metadata';
import { Owners } from "@entity/Owners"
import { autoInjectable, inject } from "tsyringe"
import { IOwnerRepository } from "../../repository/IOwnerRepository"

@autoInjectable()
export class FindAllOwners {
  constructor(@inject('OwnerRepository') private ownerRepository: IOwnerRepository) {}

  async execute(): Promise<Owners[]> | null {
    return this.ownerRepository.find()
  }

}