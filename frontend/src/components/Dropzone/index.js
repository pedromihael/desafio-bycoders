import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { mapContent } from '../../helpers/mapTransactions'
import { useConnection } from '../../hooks/useConnection'
import { toast } from 'react-toastify';
import { FormBox } from './styles'

const validateContent = (data) => {
  const transactions = data.split('\n').filter(t => t !== '' && t.length === 80)
  if (transactions.length === 0) {
    toast.error("File is empty!")
    return false
  }
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

          toast.success("File uploaded!")

        }

      }

      reader.readAsText(file)
    } else {
      toast.error("File must be a .txt")
    }
    setLoading(false)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <FormBox isLoading={isLoading} disabled={isLoading}>
        <div {...getRootProps()}>
          <input {...getInputProps()} disabled={isLoading} />
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