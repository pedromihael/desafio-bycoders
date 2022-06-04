import React, {useEffect, useState} from 'react'
import BasicTable from '../../components/Table'
import { Label } from '../../components/Label'
import { Container } from './styles'
import { useConnection } from '../../hooks/useConnection'

export function Stores() {
  const connection = useConnection()
  const [stores, setStores] = useState(null)

  useEffect(() => {
    (async () => {
      const data = await connection.get("/transactions/store")
      setStores(data.data)
    })()
  }, [])

  return (
    <Container>
    {
        stores && stores.map(store => {
          return  (
            <article>
              <Label>{store.storeName} - Total: R${parseFloat(store.cash).toFixed(2)}</Label>
              <BasicTable data={store} />
            </article>
          )
      })}
      
    </Container>
  )
}