import React from 'react'
import { Container } from './styles'
import { Dropzone } from '../../components/Dropzone'
import { Label } from '../../components/Label'

export function Home() {
  return (
    <Container>
      <Label>Upload your CNAB file</Label>
      <Dropzone />
    </Container>
  )
}