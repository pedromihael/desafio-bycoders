import { ITransactions } from '../model/ITransactions';

export class TransactionBuilder {
  private transactionData: ITransactions;

  constructor(id: string) {
    this.transactionData = {
      id,
      value: 0.0,
      costumer_cpf: 'any cpf costumer',
      costumer_card_number: 'any costumer card number',
      date: new Date(),
      hour: new Date(),
      operation_type: 0,
      store_id: 'any store id'
    };
  }

  public setValue(value: number) {
    this.transactionData.value = value;
    return this;
  }
  
  public setCostumerCpf(costumer_cpf: string) {
    this.transactionData.costumer_cpf = costumer_cpf;
    return this;
  }

  public setCostumerCardNumber(costumer_card_number: string) {
    this.transactionData.costumer_card_number = costumer_card_number;
    return this;
  }

  public setOperationType(operation_type: number) {
    this.transactionData.operation_type = operation_type;
    return this;
  }

  public build() {
    return this.transactionData;
  }
}
