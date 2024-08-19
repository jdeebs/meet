import { useEffect, useState } from 'react'
import axios from 'axios'

import storageItems from '../utils/storage-items'
import ENDPOINTS from '../constants/endpoints'

/**
 * 1. checks if token is in local storage
 * 2. if yes. let user use api to getEvents
 * 3. else send to google auth to sign and get accessToken
 */

export default function useCheckToken() {
  const [token, setToken] = useState(null)

  const getAuthUrl = async () => {
    try {
      const res = await axios.get(ENDPOINTS.GET_AUTH_URL)
      if(res.status !== 200) throw new Error("something went wrong..")
      return res.data
    } catch (error) {
      console.error('handle error')
    }
  }


  useEffect(() => {
    const run = async () => {
      const checkToken = localStorage.getItem(storageItems.ACCESS_TOKEN)
      if(checkToken) setToken(checkToken)
      else {
        const {authUrl} = await getAuthUrl()
        return (window.location.href = authUrl);
        // ENDPOINTS.GET_AUTH_URL
        // console.log('make user login')
      }

    }
    run()

  }, [])

  return token

  
}