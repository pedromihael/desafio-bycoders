import { Stores } from "~/entity/Stores";
import { IStoreRepository } from "./IStoreRepository";

export class FakeStoreRepository implements IStoreRepository {

  private storerepository = []

  async save(operation: Stores): Promise<Stores> {
    this.storerepository.push(operation)
    return new Promise((res, rej) => {
      res(operation)
    })
  }

  async find(): Promise<Stores[]> {
    return new Promise((res, rej) => {
      res(this.storerepository)
    })
  }

  async findOneBy(condition: Object): Promise<Stores> {
    return new Promise((res, rej) => {
      const found = this.storerepository.find(o =>
        o[Object.keys(condition)[0]] === condition[Object.keys(condition)[0]])
      res(found) 
    })
  }

  async remove(operation: Stores): Promise<Stores> {
    return new Promise((res, rej) => {
      const found = this.storerepository.find(o =>
        o.id === operation.id)
      
      const removed = this.storerepository.filter(o =>
        o.id !== operation.id)
      
      this.storerepository = removed
      
      res(found)
    })
  }

  async update(identification: Object, payload: Object): Promise<any> | null {
    return new Promise((res, rej) => {
      const updated = this.storerepository.map(o => {
        if (o[Object.keys(identification)[0]] === identification[Object.keys(identification)[0]]) {
          return {...o, ...payload}
        }

        return o
      })

      this.storerepository = updated

      res(this.storerepository)
    })
  }

}