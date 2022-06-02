export const classifyTransactions = (type) => {
  const classes = [
    {
      type: 1, desc: 'Débito', kind: 'income', sign: 'INCOME' 
    },
    {
      type: 2, desc: 'Boleto', kind: 'outcome', sign: 'OUTCOME' 
    },
    {
      type: 3, desc: 'Financiamento', kind: 'outcome', sign: 'OUTCOME' 
    },
    {
      type: 4, desc: 'Crédito', kind: 'income', sign: 'INCOME' 
    },
    {
      type: 5, desc: 'Recebimento Empréstimo', kind: 'income', sign: 'INCOME' 
    },
    {
      type: 6, desc: 'Vendas', kind: 'income', sign: 'INCOME' 
    },
    {
      type: 7, desc: 'Recebimento TED', kind: 'income', sign: 'INCOME' 
    },
    {
      type: 8, desc: 'Recebimento DOC', kind: 'income', sign: 'INCOME' 
    },
    {
      type: 9, desc: 'Aluguel', kind: 'outcome', sign: 'OUTCOME' 
    },
  ]

  return classes.find(c => c.type === parseInt(type))
}