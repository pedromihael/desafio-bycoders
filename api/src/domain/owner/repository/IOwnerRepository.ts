import { Owners } from "~/entity/Owners";

export interface IOwnerRepository {
  save: (owner: Owners) => Promise<Owners> | null,
  find: () => Promise<Owners[]> | null,
  findOneBy: (condition: Object) => Promise<Owners> | null,
  remove: (owner: Owners) => Promise<Owners> | null,
}