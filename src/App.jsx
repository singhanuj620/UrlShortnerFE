import './App.css'
import NavbarComponent from './Components/Navbar/Navbar'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className='app-container'>
      <NavbarComponent/>
      <Outlet/>
    </div>
  )
}

export default App
