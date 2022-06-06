import { Owners } from "~/entity/Owners";
import { IOwnerRepository } from "./IOwnerRepository";

export class FakeOwnerRepository implements IOwnerRepository {

  private ownerrepository = []

  async save(operation: Owners): Promise<Owners> {
    this.ownerrepository.push(operation)
    return new Promise((res, rej) => {
      res(operation)
    })
  }

  async find(): Promise<Owners[]> {
    return new Promise((res, rej) => {
      res(this.ownerrepository)
    })
  }

  async findOneBy(condition: Object): Promise<Owners> {
    return new Promise((res, rej) => {
      const found = this.ownerrepository.find(o =>
        o[Object.keys(condition)[0]] === condition[Object.keys(condition)[0]])
      res(found) 
    })
  }

  async remove(operation: Owners): Promise<Owners> {
    return new Promise((res, rej) => {
      const found = this.ownerrepository.find(o =>
        o.id === operation.id)
      
      const removed = this.ownerrepository.filter(o =>
        o.id !== operation.id)
      
      this.ownerrepository = removed
      
      res(found)
    })
  }

}