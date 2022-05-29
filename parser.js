const fs = require('fs')

const readFile = () => {
  const file = process.argv[2]
  fs.readFile(file, 'utf-8', (err, data) => {
    if (data) {
      parseFile(data)
    } else {
      console.log('erro', err)
    }
  })
} 

const parseFile = (data) => {
  const transactions = data.split('\n').filter(t => t !== '' && t.length === 80)

  const parsedTransactions = transactions.map((t, id) => {
    const parsedDate = t.slice(1, 9).replace(/(?<=^(.{4}))/, '/').replace(/(?<=^(.{7}))/, '/')
    const parsedHours = t.slice(42, 48).replace(/(?<=^(.{2}))/, ':').replace(/(?<=^(.{5}))/, ':')
    
    const type = parseInt(t[0])
    const date = new Date(parsedDate)
    const value = parseFloat(t.slice(9, 19)/100)
    const cpf = t.slice(19, 30)
    const card = t.slice(30, 42)
    const hour = new Date(`${parsedDate} ${parsedHours}`)
    const owner = t.slice(48, 62)
    const store = t.slice(62, 81)

    const transactionClass = classifyTransactions(type)
    const transaction_desc = transactionClass.desc
    const transaction_kind = transactionClass.kind
    const transaction_sign = transactionClass.sign

    return {
      id,
      type,
      date,
      value,
      cpf,
      card,
      hour,
      owner,
      store,
      transaction_desc,
      transaction_kind,
      transaction_sign
    }
  })

  console.log(parsedTransactions)
}

const classifyTransactions = (type) => {
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

readFile()