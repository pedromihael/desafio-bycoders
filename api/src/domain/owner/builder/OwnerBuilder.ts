import { IOwners } from '../model/IOwners';


export class OperationBuilder {
  private ownerData: IOwners;

  constructor(id: string) {
    this.ownerData = {
      id,
      name: 'any name'
    };
  }

  public setname(name: string) {
    this.ownerData.name = name;
    return this;
  }

  public build() {
    return this.ownerData;
  }
}
