import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { mapContent } from '../../helpers/mapTransactions'
import { useConnection } from '../../hooks/useConnection'
import { FormBox } from './styles'

const validateContent = (data) => {
  const transactions = data.split('\n').filter(t => t !== '' && t.length === 80)
  if (transactions.length === 0) return false
  return true
}

export function Dropzone() {
  const [isLoading, setLoading] = useState(false)
  const connection = useConnection()

  const onDrop = useCallback(upload => {
    setLoading(true)
    const reader = new FileReader()
    const file = upload[0]

    if (file.type === 'text/plain') {
      reader.onload = () => {
        const fileContent = reader.result
       
        if (validateContent(fileContent)) {
          const contentMapped = mapContent(fileContent)
          
          contentMapped.map(content => {
            console.log('contentMapped', content)
            connection.post('/transactions', content).then(res => {
              console.log(res)
            })
          })

        }

      }

      reader.readAsText(file)
    }
    setLoading(false)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <FormBox isLoading={isLoading}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isLoading ?
              <p>Loading files ...</p> :
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      </FormBox>
    </>
  )
}