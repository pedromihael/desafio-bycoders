import { Request } from "express"
import { Stores } from "@entity/Stores"
import { FindsertStoreByName } from "../findsertStoreByName/findsertStoreByName"
import { autoInjectable, inject } from "tsyringe"
import { IStoreRepository } from "../../repository/IStoreRepository"

@autoInjectable()
export class UpdateStoreCash {
  
  constructor(@inject('StoreRepository') private storeRepository: IStoreRepository, request: Request, owner_id: string) {
    this.request = request
    this.owner_id = owner_id
  }
  
  private findsertStoreByNameUseCase: FindsertStoreByName
  private request: Request
  private owner_id: string

  async execute() {
    try {
      if (this.request.body.value && this.request.body.store && this.owner_id) {
        this.findsertStoreByNameUseCase = new FindsertStoreByName(this.storeRepository, this.request.body.store, this.owner_id)
        const store = await this.findsertStoreByNameUseCase.execute()
        const updated = await this.storeRepository.update(
          { id: store.id },
          { cash: parseFloat(`${parseFloat(store.cash) + parseFloat(this.request.body.value)}`) })
        return updated
      } else {
        return {
          code: 304,
          entity: "Store",
          message: `Store not updated. Check the body request.`
        }
      }
    } catch (error) {
      return error
    }
  }

}