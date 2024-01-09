import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

const NavbarComponent = () => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const location = useLocation();
  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken")
    if(jwtToken){
      setIsUserLoggedIn(true)
    }
    else{
      setIsUserLoggedIn(false)
    }
  },[location])

  const handleLogout = () => {
    Cookies.remove("jwtToken")
    setIsUserLoggedIn(false)
    window.location.replace('/login');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">URL Shortner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isUserLoggedIn && 
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            }
            {isUserLoggedIn && 
              <>
                <Nav.Link href="/short">Short</Nav.Link>
                &nbsp;&nbsp;
                <Nav.Link href="/profile">Profile</Nav.Link>
                &nbsp;&nbsp;
                <Navbar.Text style={{cursor: "pointer"}} onClick={handleLogout}>Logout</Navbar.Text>
              </>
            }
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Made By: <a href="https://github.com/singhanuj620" target="_blank" rel="noreferrer" alt="Anuj Singh">Anuj Singh</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;