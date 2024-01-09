import './Signup.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const Signup = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    const handleSignup = async () => {
        const resp = await axios({
          method: 'POST',
          url: `${import.meta.env.VITE_BACKEND_DOMAIN}/signup`,
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
          window.location.replace('/login');
        } 
    }

  return (
    <div className='signup-container'>
      <h1>SIGNUP</h1>
        <div className='signup-form'>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
    </Form.Group>
    <Button variant="primary" onClick={handleSignup}>
      Submit
    </Button>
  </Form>
  </div>
  {isError && <div className='signup-alert'>
  <Alert key="danger" variant="danger" dismissible>
      {errorMsg}
  </Alert>
  </div>}
  </div>
  )
}

export default Signup