import { Owners } from "~/entity/Owners";

export interface IOwnerRepository {
  save: (operation: Owners) => Promise<Owners> | null,
  find: () => Promise<Owners[]> | null,
  findOneBy: (condition: Object) => Promise<Owners> | null,
  remove: (operation: Owners) => Promise<Owners> | null,
}