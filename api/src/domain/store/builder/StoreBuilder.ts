import { IStores } from '../model/IStore';

export class StoreBuilder {
  private storeData: IStores;

  constructor(id: string) {
    this.storeData = {
      id,
      store: 'any store',
      owner_id: 'any owner id',
      name: 'any name',
      value: 0.0
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

  public setValue(value: number) {
    this.storeData.value = value;
    return this;
  }

  public build() {
    return this.storeData;
  }
}
