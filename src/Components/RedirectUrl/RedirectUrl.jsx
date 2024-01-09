import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ClockLoader from "react-spinners/ClockLoader";

const RedirectUrl = () => {
    const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState()
  const location = useLocation()

    const handleRedirect = async () => {
        const shortUrl = location.pathname.split("/s/")[1]
        const resp = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_DOMAIN}/geturl/${shortUrl}`,
          })

          if(resp && resp?.data && resp?.data?.msg){
            setIsError(true)
            setErrorMsg(resp.data.msg)
          }
          else {
            console.log(resp.data.findLongUrl.longUrl)
            window.location.replace(resp.data.findLongUrl.longUrl)
          }
    }

    useEffect(() => {
        handleRedirect()
    })
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
    {isError && <h1>{errorMsg}</h1>}
    <ClockLoader color="#000000" />
    </div>
  )
}

export default RedirectUrl