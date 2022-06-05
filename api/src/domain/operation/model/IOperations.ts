import { OperationSign } from "../../../entity/Operations";

export interface IOperations {
  _id?: string,
  description: string,
  type: number,
  kind: string,
  sign: OperationSign
}