import './Login.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    useEffect(() => {
      const jwtToken = Cookies.get("jwtToken")
      if(jwtToken){
        window.location.replace('/short');
      }
    },[])
    
    const handleLogin = async () => {
        const resp = await axios({
          method: 'POST',
          url: `${import.meta.env.VITE_BACKEND_DOMAIN}/login`,
          data: {
            username,
            password 
          }
        })

        if(resp && resp?.data && resp?.data?.msg){
          setIsError(true)
          setErrorMsg(resp.msg)
        }
        else {
          console.log(resp)
          setIsError(false)
          setErrorMsg()
          Cookies.set("jwtToken", resp?.data?.jwtToken)
          window.location.replace('/short');
        } 
    }

  return (
    <div className='login-container'>
      <h1>LOGIN</h1>
        <div className='login-form'>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
    </Form.Group>
    <Button variant="primary" onClick={handleLogin}>
      Submit
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

export default Login