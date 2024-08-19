import { useEffect, useState } from 'react'
import storageItems from '../utils/storage-items'

export default function useCheckToken() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const checkToken = localStorage.getItem(storageItems.ACCESS_TOKEN)
    if(checkToken) setToken(checkToken)

  }, [])

  return token

  
}