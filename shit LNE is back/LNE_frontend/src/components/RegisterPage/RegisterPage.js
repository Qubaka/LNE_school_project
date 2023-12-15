import { useState } from 'react';
import './RegisterPage.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function RegisterPage() {

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
  //Name to samo
  const [Name, setName] = useState("");
  const UpdateName = (event)=>{
    setName(event.target.value);
  }
  //funkcje do updatowania hasła i powtórzenia
  const [Password, setPassword] = useState("");
  const UpdatePassword = (event)=>{
    setPassword(event.target.value);
  }
  const [PasswordRep, setPasswordRep] = useState("");
  const UpdatePasswordRep = (event)=>{
    setPasswordRep(event.target.value);
  }
  //Funkcja do rejestracji
  const RegisterUser = async()=>{
    console.log({email: Email, name:Name, password:Password, passwordrep: PasswordRep});
    try{
      const response = await axios.post('http://localhost:3000/register', {email: Email, name:Name, pasword:Password, reppasword: PasswordRep})
      LoginUser(response);
    }
    catch(error){
      console.error('register fucked up')
    }
  }
  //Funkcja do logowania po rejestracji
  const LoginUser = async(e)=>{
    try{
      const response_Id = await axios.post('http://localhost:3000/login', {email: Email, password: Password});
      const response_data = await axios.get('http://localhost:3000/getUserData/'+response_Id.data);
      //ustawianie sesji użytkownika
      sessionStorage.setItem("UserId", response_Id.data);
      sessionStorage.setItem("UserRole", response_data.data.role);
      sessionStorage.setItem("UserData", response_data);
      navigate("/");
    }
    catch(error){
      console.error('login fucked up')
    }

  }

  return (
    <div id="RegisterPage">
      <Navbar></Navbar>
      <div>
        <label className="formLabel">Email</label>
        <input className='formInputs' onChange={UpdateEmail} onBlur={UpdateEmail} type="text"></input> <br></br>
        <label className="formLabel">Name</label>
        <input className='formInputs' onChange={UpdateName} onBlur={UpdateName} type="text"></input> <br></br>
        <label className="formLabel">Password</label>
        <input className='formInputs' onChange={UpdatePassword} onBlur={UpdatePassword} type="password"></input> <br></br>
        <label className="formLabel">Repeat Password</label>
        <input className='formInputs' onChange={UpdatePasswordRep} onBlur={UpdatePasswordRep} type="password"></input> <br></br>
        <button className='formButton' onClick={RegisterUser}>Yes sir</button>
      </div>
    </div>
  );
}

export default RegisterPage;