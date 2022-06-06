import { OperationSign } from "../../../entity/Operations";

export interface IOperations {
  id?: string,
  description: string,
  type: number,
  kind: string,
  sign: OperationSign
}