import { Operations } from "~/entity/Operations";

export interface IOperationRepository {
  save: (operation: Operations) => Promise<Operations> | null,
  find: () => Promise<Operations[]> | null,
  findOneBy: (condition: Object) => Promise<Operations> | null,
  remove: (operation: Operations) => Promise<Operations> | null,
}