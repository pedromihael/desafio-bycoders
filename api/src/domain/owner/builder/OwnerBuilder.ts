import { IOwners } from '../model/IOwners';


export class OwnerBuilder {
  private ownerData: IOwners;

  constructor(id: string) {
    this.ownerData = {
      id,
      name: 'any name'
    };
  }

  public setName(name: string) {
    this.ownerData.name = name;
    return this;
  }

  public build() {
    return this.ownerData;
  }
}
