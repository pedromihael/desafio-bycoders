import axios from 'axios'

export const useConnection = () => {
  const connection = axios.create({
    baseURL: 'http://localhost:3006'
  })

  return connection
}