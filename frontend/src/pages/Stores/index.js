import React from 'react'
import BasicTable from '../../components/Table'
import { Label } from '../../components/Label'
import { Container } from './styles'
import {useLocation} from 'react-router-dom'

export function Stores() {
  const location = useLocation()
  const stores = location.state

  return (
    <Container>
    {
      stores.map(store => (
        <>
          <Label>{store.storeName} - Total: R${store.storeCash}</Label>
          <BasicTable data={store} />
        </>
      ))}
    </Container>
  )
}