import { Operations, OperationSign } from "../../../../entity/Operations"
import { AppDataSource } from "../data-source"

(async () => {
    const values = [
        { description: 'Débito', type: 1, kind: 'Entrada', sign: OperationSign.INCOME },
        { description: 'Boleto', type: 2, kind: 'Saída', sign: OperationSign.OUTCOME },
        { description: 'Financiamento', type: 3, kind: 'Saída', sign: OperationSign.OUTCOME },
        { description: 'Crédito', type: 4, kind: 'Entrada', sign: OperationSign.INCOME },
        { description: 'Recebimento Empréstimo', type: 5, kind: 'Entrada', sign: OperationSign.INCOME },
        { description: 'Vendas', type: 6, kind: 'Entrada', sign: OperationSign.INCOME },
        { description: 'Recebimento TED', type: 7, kind: 'Entrada', sign: OperationSign.INCOME },
        { description: 'Recebimento DOC', type: 8, kind: 'Entrada', sign: OperationSign.INCOME },
        { description: 'Aluguel', type: 9, kind: 'Saída', sign: OperationSign.OUTCOME },
    ]
    await AppDataSource.initialize()

    const operationRepository = AppDataSource.getRepository(Operations)
    
    try {
        values.map(async value => {
            return await operationRepository.save(value)
        })
    } catch (error) {
        console.log(error)
    }

    return
})()
