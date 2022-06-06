import 'reflect-metadata';
import { autoInjectable, inject } from "tsyringe"
import { Owners } from '~/entity/Owners';
import { IOwnerRepository } from "../../repository/IOwnerRepository"

@autoInjectable()
export class FindOwnerByType {

  constructor(@inject('OwnerRepository') private ownerRepository: IOwnerRepository, name: string) {
    this.name = name
  }

  private name: string

  async execute(): Promise<Owners | any> {
    try {
      let owner = await this.ownerRepository.findOneBy({ name: this.name })
      if (!owner) {
        owner = await this.ownerRepository.save({ name: this.name })
      }
      return owner
    } catch (error) {
      return {
        error,
        code: 404,
        entity: "Owner",
        message: `Owner with name ${this.name} not found.`
      }
    }
  }

}