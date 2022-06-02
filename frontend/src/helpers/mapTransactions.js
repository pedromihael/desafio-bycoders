export const mapContent = (data) => {
  const transactions = data.split('\n').filter(t => t !== '' && t.length === 80)

  const parsedTransactions = transactions.map((t, id) => {
    const parsedDate = t.slice(1, 9).replace(/(?<=^(.{4}))/, '/').replace(/(?<=^(.{7}))/, '/')
    const parsedHours = t.slice(42, 48).replace(/(?<=^(.{2}))/, ':').replace(/(?<=^(.{5}))/, ':')
    
    const operation_type = parseInt(t[0])
    const date = new Date(parsedDate)
    const value = parseFloat(t.slice(9, 19)/100)
    const costumer_cpf = t.slice(19, 30)
    const costumer_card_number = t.slice(30, 42)
    const hour = new Date(`${parsedDate} ${parsedHours}`)
    const owner = t.slice(48, 62).replace(/\s+/g, ' ').trim()
    const store = t.slice(62, 81).replace(/\s+/g, ' ').trim()

    return {
      operation_type,
      date,
      value,
      costumer_cpf,
      costumer_card_number,
      hour,
      owner,
      store
    }
  })

  console.log(parsedTransactions)
  return parsedTransactions
}