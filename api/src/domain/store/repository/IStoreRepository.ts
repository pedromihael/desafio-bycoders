import { Stores } from "~/entity/Stores";

export interface IStoreRepository {
  save: (store: Stores) => Promise<Stores> | null,
  find: () => Promise<Stores[]> | null,
  findOneBy: (condition: Object) => Promise<Stores> | null,
  remove: (store: Stores) => Promise<Stores> | null,
  update: (identification: Object, payload: Object) => Promise<Stores> | null
}