import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { Request } from "express"
import { Owners } from "@entity/Owners"
import { isInstanceOf } from "@shared/helper/instanceOf"
import { IOwners } from "../../model/IOwners"
import { keys } from 'ts-transformer-keys'

export class SaveOwner {
  private ownerRepository = AppDataSource.getRepository(Owners)
  private request: Request

  constructor(request: Request) {
    this.request = request
  }

  async execute() {
    try {
      const owner: Owners = this.request.body
      if (isInstanceOf(owner, keys<IOwners>())) {
        return this.ownerRepository.save(owner)
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