import { Operations } from "~/entity/Operations";
import { IOperationRepository } from "./IOperationRepository";

export class FakeOperationRepository implements IOperationRepository {

  private operationRepository = []

  async save(operation: Operations): Promise<Operations> {
    this.operationRepository.push(operation)
    return new Promise((res, rej) => {
      res(operation)
    })
  }

  async find(): Promise<Operations[]> {
    return new Promise((res, rej) => {
      res(this.operationRepository)
    })
  }

  async findOneBy(condition: Object): Promise<Operations> {
    return new Promise((res, rej) => {
      const found = this.operationRepository.find(o =>
        o[Object.keys(condition)[0]] === condition[Object.keys(condition)[0]])
      res(found) 
    })
  }

  async remove(operation: Operations): Promise<Operations> {
    return new Promise((res, rej) => {
      const found = this.operationRepository.find(o =>
        o.id === operation.id)
      
      const removed = this.operationRepository.filter(o =>
        o.id !== operation.id)
      
      this.operationRepository = removed
      
      res(found)
    })
  }

}