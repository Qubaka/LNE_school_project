import React, { useState,useEffect } from 'react';
import AddInfoForm from '../AddInfoForm/AddInfoForm';
import AddImageForm from '../AddImageForm/AddImageForm';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './AddItemsPage.css'
import { useNavigate } from 'react-router-dom';

function AddItemsPage() {
  const [ItemInfo, setItemInfo] = useState({});
  const [ItemPhoto, setItemPhoto] = useState(null);
  const [FormError, setFormError] = useState(false);
  const navigate = useNavigate();

  const CheckPermission = () => {
    if (sessionStorage.getItem("UserRole") === "banned") {
      navigate("/lbozo");
    }
  }
  
  useEffect(() => {
    CheckPermission();
  }, [])

  const AddItemToDatabase = async () => {
    // Check if ItemPhoto is available
    if(ItemInfo.title != null && ItemInfo.description != null && ItemInfo.price != null && ItemInfo.tag != null && ItemPhoto != null){
      if (!ItemPhoto) {
        console.error("Item photo is null");
        return;
      }
      console.log(ItemInfo.title);
      const formData = new FormData();
      formData.append('name', ItemInfo.title);
      console.log(ItemInfo.title);
      formData.append('description', ItemInfo.description);
      formData.append('price', ItemInfo.price);
      formData.append('tag', ItemInfo.tag);
      
      formData.append('image', ItemPhoto);
      console.log(formData['image'])

        console.log("something")
        try {
          const response = await axios.post('http://localhost:3000/put_up_for_sale/' + sessionStorage.getItem("UserId"), formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response);
          navigate("/");
        } catch (error) {
          console.error('Error adding data to database:', error);
        }
    }else{
      setFormError(true);
    }


  }

  const UpdateItemInfo = (iteminfo) => {
    setItemInfo(iteminfo)
  }

  const UpdateItemPhoto = (formData) => {
    setItemPhoto(formData.get('image')); // Assuming 'image' is the key containing the photo data
  };

  return (
    <div id="AddItemsPage">
      <Navbar />
      <div className='addStuffCont'>
        <div className='sidebyside'>
          <div className='imgaside'>
            <AddImageForm SendUpPhoto={UpdateItemPhoto} />
          </div>
          <div className='inputaside'>
            <h2>Create Listing</h2>
            <div  style={FormError ? { display: 'flex' } : { display: 'none' }}>
              <p>You didn't fill out the form you f*****g idiot</p>
            </div>
            <AddInfoForm SendUp={UpdateItemInfo} />
          </div>
        </div>

        <div className='verybottom'>
          <button onClick={AddItemToDatabase}>Add Item</button>
        </div>
      </div>
    </div>
  );
}

export default AddItemsPage;