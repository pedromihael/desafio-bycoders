import { IStores } from '../model/IStore';

export class StoreBuilder {
  private storeData: IStores;

  constructor(id: string) {
    this.storeData = {
      id,
      owner_id: 'any owner id',
      name: 'any name'
    };
  }

  public setName(name: string) {
    this.storeData.name = name;
    return this;
  }

  public setOwnerId(owner_id: string) {
    this.storeData.owner_id = owner_id;
    return this;
  }

  public build() {
    return this.storeData;
  }
}
