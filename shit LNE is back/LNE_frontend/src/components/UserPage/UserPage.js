import './UserPage.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import OfferFrame from '../OfferFrame/OfferFrame';

function UserPage(props) {
  const navigate = useNavigate();
  
  const [UserData, setUsersData] = useState(null);
  const [Editmode, setEditmode] = useState(false);
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userage, setUserage] = useState(0);
  const [useradress, setUseradress] = useState("");
  const [usercity, setUsercity] = useState("");
  const [userbio, setUserbio] = useState("");
  const [imageToSend, setImageToSend] = useState();
  const [image, setImage] = useState({})
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setImage(URL.createObjectURL(event.target.files[0]));

    reader.onloadend = () => {
      setImageToSend(file)
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };



  //Pobier Dane użytkownika
  const GetUserData = async()=>{
    try{
      
      const response_data = await axios.get('http://localhost:3000/getUserData/'+sessionStorage.getItem("UserId"));
      //console.log(response_data);
      setUsersData(response_data);
    }
    catch(error){
      console.error('I do not know who you are or what you are ding here')
    }
  }

  useEffect(() => {
    GetUserData();
  }, [])

  //Funkcja do filtrowania itemów urzytkownika
  const FilterArray = (object) =>{
      return object.userId === sessionStorage.getItem("UserId");
  }
  const filteredItems = props.items.filter(FilterArray);
  // włącza mode do edytowania
  const EnableEdit = () =>{
    Editmode ? setEditmode(false) : setEditmode(true);
  }
  //Wysyłka do bejzy dejnych o edit użytkownika
  const EditUserInfo  = async () =>{
    try {
      const response = await axios.post('http://localhost:3000/updateUserInfo/' + sessionStorage.getItem("UserId"),  {name: username,email:useremail,age:userage,adress:useradress,city:usercity,bio:userbio,image:imageToSend}, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setEditmode(false)
      window.location.reload(false);
    } catch (error) {
      console.error('Error wile updating user data', error);
    }
  }
  let profilePicture = `http://localhost:3000/photos/default.jpg`;
  if(UserData !== null){
    profilePicture = `http://localhost:3000/${UserData.data.profilePic}`;
  }
  const ChangeEmail = (e) =>{setUseremail(e.target.value)};
  const ChangeName = (e) =>{setUsername(e.target.value)};
  const ChangeAge = (e) =>{setUserage(e.target.value)}
  const ChangeAdress = (e) =>{setUseradress(e.target.value)}
  const ChangeCity = (e) =>{setUsercity(e.target.value)}
  const ChangeBio = (e) =>{setUserbio(e.target.value)}
  
  return (
    <div id="UserPage">
      <Navbar/>
      <div className='userStuff'>
        <div className='imgAside'>
          <div className='addimglol'>

            {Editmode ? 
            <>
              <img alt="" src={image}></img>
              <label className='fileSelect'>
                <input type="file" onChange={handleFileInputChange} />
                Select Image
              </label></>
            :
            // eslint-disable-next-line jsx-a11y/alt-text
            <img src={profilePicture}></img>}
            <p>{UserData !== null  ? UserData.data.name : "N/A"}</p>
          </div>
        </div>
        <div className='textContent'>
          <button className='editbutton' onClick={EnableEdit}>Edit</button>
          {Editmode  ? 
            <div className='alignThem'>
              <p>Permission Level:  {UserData !== null  ? UserData.data.role : "N/A"}</p>
              <div className='alignEnd'>
                <label>E-mail:</label>
                <input type='text' defaultValue={UserData.data.email} onChange={ChangeEmail}></input>
              </div>
              <div  className='alignEnd'>
                <label>Name:</label>
                <input type='text' defaultValue={UserData.data.name} onChange={ChangeName}></input> 
              </div>
              <div  className='alignEnd'>
                <label>Age:</label>
                <input type='text' defaultValue={UserData.data.age} onChange={ChangeAge}></input> 
              </div>
              <div  className='alignEnd'>
                <label>Adress:</label>
                <input type='text' defaultValue={UserData.data.adress} onChange={ChangeAdress}></input>
              </div>
              <div  className='alignEnd'>
                <label>City:</label>
                <input type='text' defaultValue={UserData.data.city} onChange={ChangeCity}></input> 
              </div>
              <div  className='alignEnd'>
                <label>Bio:</label>
                <input type='text' defaultValue={UserData.data.bio} onChange={ChangeBio}></input>
              </div>
              <button onClick={EditUserInfo}>Save Changes</button>
            </div>
           : 
            <div>
              <p>Permission Level: {UserData !== null  ? UserData.data.role : "N/A"}</p>
              <p>E-mail: {UserData !== null  ? UserData.data.email : "N/A"}</p>
              <p>Name: {UserData !== null  ? UserData.data.name : "N/A"}</p>
              <p>Age: {UserData !== null  ? UserData.data.age : "N/A"}</p>
              <p>Adress: {UserData !== null  ? UserData.data.adress : "N/A"}</p>
              <p>City: {UserData !== null  ? UserData.data.city : "N/A"}</p>
              <p>Bio: {UserData !== null  ? UserData.data.bio : "N/A"}</p>
            </div>}
        </div>
      </div>
      <div className='listingStuff' >
      <h3>Your Offers</h3>
        {filteredItems.map((object, key) => (
          <OfferFrame key={key} item={object}></OfferFrame>
        ))}
      </div>
    </div>
  );
}

export default UserPage;