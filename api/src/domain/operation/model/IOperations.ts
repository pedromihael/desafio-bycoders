import { OperationSign } from "../../../entity/Operations";

export interface IOperations {
  description: string,
  type: number,
  kind: string,
  sign: OperationSign
}