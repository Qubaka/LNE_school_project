import { Link } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';


function Navbar() {
  const [State, setState] = useState()
  const [Open, setOpen] = useState(false)

  useEffect(() => {
    console.log(sessionStorage.getItem("UserRole"));
    if(sessionStorage.getItem("UserId") !== null){
      setState(true);
    }
    
  }, [])

  let hamburgerHandler = ()=>{
    console.log("lol??")
    setOpen(!Open)
  }

  return (
    <div id="Navbar">
      <Link className='navlink' to="/"><h1>Learn'n Earn</h1></Link>
      <div className='mobileBurger'>
        <p className='burgerStuff' onClick={hamburgerHandler} style={Open ? { color: 'white' } : { color: '#212121' }}>\/</p>
        <div className='burburg' style={Open ? { display: 'flex' } : { display: 'none' }}>
          <Link className='navlink' to="/">Home</Link>
          
          {sessionStorage.getItem("UserRole") === "admin" ? (
            <Link className='navlink' to="/AdminPanel">Admin</Link>
          ) : <></>}
          
          {sessionStorage.getItem("UserId") !== null ? (
            <div>
              <Link className='navlink' to="/additem">Sell</Link>
              <Link className='navlink' to="/userpage">Profile</Link>
              <Link className='navlink' to="/boughtHistory">Orders</Link>
              <Link className='navlink' to="/logout">Logout</Link>
            </div>

          ) : (
            <div>
              <Link className='navlink' to="/login">Login</Link>
              <Link className='navlink' to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
      <div className='links'>
        <Link className='navlink' to="/">Home</Link>
        
        {sessionStorage.getItem("UserRole") === "admin" ? (
          <Link className='navlink' to="/AdminPanel">Admin</Link>
        ) : <></>}
        
        {sessionStorage.getItem("UserId") !== null ? (
          <div>
            <Link className='navlink' to="/logout">Logout</Link>
            <Link className='navlink' to="/additem">Sell</Link>
            <Link className='navlink' to="/userpage">Profile</Link>
            <Link className='navlink' to="/boughtHistory">Orders</Link>
          </div>

        ) : (
          <div>
            <Link className='navlink' to="/login">Login</Link>
            <Link className='navlink' to="/register">Register</Link>
          </div>
        )}
      </div>

    </div>

  );
}

export default Navbar;