import 'reflect-metadata';
import { Request } from 'express';
import { autoInjectable, inject } from "tsyringe"
import { IOwnerRepository } from "../../repository/IOwnerRepository"
import { Owners } from '~/entity/Owners';

@autoInjectable()
export class RemoveOwner {
  
  constructor(@inject('OwnerRepository') private ownerRepository: IOwnerRepository, request: Request | any) {
    this.request = request
  }
  
  private request: Request
  
  async execute(): Promise<Owners | any> {
    const ownerToRemove = await this.ownerRepository.findOneBy({ id: this.request.params.id })
    if (ownerToRemove) {
      try {
        const owner = await this.ownerRepository.remove(ownerToRemove)
        if (!owner) {
          return {
            code: 404,
            entity: "Owner",
            message: `Owner with id ${this.request.params.id} not removed.`
          }
        } return owner
      } catch (error) {
        return error
      }
    } else return null
  }

}