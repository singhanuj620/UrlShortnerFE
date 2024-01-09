import './Homepage.css'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Cookies from 'js-cookie';

const Homepage = () => {
    const [longUrl, setLongUrl] = useState()
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    
    const handleShort = async () => {
        const resp = await axios({
          method: 'POST',
          url: `${import.meta.env.VITE_BACKEND_DOMAIN}/short`,
          data: {
            longUrl,
          },
          headers: {
            Authorization : Cookies.get("jwtToken")
          }
        })
        if(resp && resp?.data && resp?.data?.msg){
          console.log('####',resp)
          setIsError(true)
          setErrorMsg(resp.data.msg)
        }
        else {
          console.log(resp)
          setIsError(false)
          setErrorMsg()
          window.location.replace(`/profile?shorturl=${resp.data.shortUrl}`);
        } 
    }

  return (
    <div className='login-container'>
      <h1>Short URL</h1>
        <div className='login-form'>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Long URL</Form.Label>
      <Form.Control type="text" placeholder="Enter long url" onChange={(e) => setLongUrl(e.target.value)}/>
    </Form.Group>
    <Button variant="primary" onClick={handleShort}>
      Submit
    </Button>
      &nbsp;&nbsp;&nbsp;
    <Button variant="outline-warning" onClick={() => window.location.replace("/profile")}>
      View all URLs
    </Button>
  </Form>
  </div>
  {isError && <div className='login-alert'>
  <Alert key="danger" variant="danger" dismissible>
      {errorMsg}
  </Alert>
  </div>}
  </div>
  )
}

export default Homepage