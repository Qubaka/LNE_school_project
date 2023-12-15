import { useState } from 'react';
import './LoginPage.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function LoginPage() {

  const navigate = useNavigate();
  const CheckPermission = ()=>{
    if (sessionStorage.getItem("UserRole") === "banned"){
      navigate("/lbozo");
    }
  }

  useEffect(() => {
    CheckPermission();
  }, [])

    //funkcje do updatowania emaila
  const [Email, setEmail] = useState("");
  const UpdateEmail = (event)=>{
    setEmail(event.target.value);
  }
  //funkcje do updatowania hasła
  const [Password, setPassword] = useState("");
  const UpdatePassword = (event)=>{
    setPassword(event.target.value);
  }
  //Funkcja do logowania
  const LoginUser = async()=>{
    // console.log({email: Email, password: Password});
    try{
      const response_Id = await axios.post('http://localhost:3000/login', {email: Email, password: Password});
      const response_data = await axios.get('http://localhost:3000/getUserData/'+response_Id.data);
      //console.log(response.data);
      //ustawianie sesji użytkownika
      sessionStorage.setItem("UserId", response_Id.data);
      sessionStorage.setItem("UserRole", response_data.data.role);
      sessionStorage.setItem("UserData", response_data);
      // console.log(response_data);
      navigate("/");
    }
    catch(error){
      console.error('login fucked up')
    }

  }


  return (
    <div id="LoginPage">
      <Navbar></Navbar>
      <div>
        <label className="formLabel">Email</label>
        <input className='formInputs' onChange={UpdateEmail} onBlur={UpdateEmail} type="text"></input><br></br>
        <label className="formLabel">Password</label>
        <input className='formInputs' onChange={UpdatePassword} onBlur={UpdatePassword} type="password"></input> <br></br>
        <button className='formButton' onClick={LoginUser}>Yes sir</button>
      </div>
    </div>
  );
}

export default LoginPage;