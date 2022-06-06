import 'reflect-metadata';
import { Request } from 'express';
import { autoInjectable, inject } from "tsyringe"
import { IOwnerRepository } from "../../repository/IOwnerRepository"
import { Owners } from '~/entity/Owners';

@autoInjectable()
export class SaveOwner {
  
  constructor(@inject('OwnerRepository') private ownerRepository: IOwnerRepository, request: Request | any) {
    this.request = request
  }
  
  private request: Request

  async execute(): Promise<Owners | any> {
    try {
      const owner: Owners = this.request.body
      const result = await this.ownerRepository.save(owner)
      if (result.id) {
        return result
      } else {
        return {
          code: 304,
          entity: "Owner",
          message: `Owner not created. Check the body request.`
        }
      }
    } catch (error) {
      return error
    }
  }

}