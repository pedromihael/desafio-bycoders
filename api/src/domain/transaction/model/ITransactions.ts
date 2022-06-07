export interface ITransactions {
  id?: string,
  value: number,
  costumer_cpf: string,
  costumer_card_number: string,
  date: Date,
  hour: Date,
  operation_type: number,
  store_id: string
}