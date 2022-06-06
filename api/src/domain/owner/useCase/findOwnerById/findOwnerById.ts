import 'reflect-metadata';
import { autoInjectable, inject } from "tsyringe"
import { IOwnerRepository } from "../../repository/IOwnerRepository"
import { Request } from "express"
import { Owners } from '~/entity/Owners';

@autoInjectable()
export class FindOwnerById {
  
  constructor(@inject('OwnerRepository') private ownerRepository: IOwnerRepository, request: Request | any) {
    this.request = request
  }

  private request: Request

  async execute(): Promise<Owners | any> {
    const owner = await this.ownerRepository.findOneBy({ id: this.request.params.id })
    if (!owner) {
      return {
        code: 404,
        entity: "Owner",
        message: `Owner with id ${this.request.params.id} not found.`
      }
    } return owner
  }

}