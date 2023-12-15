import './AddImageForm.css';

import React, { useState } from 'react';

const AddImageForm = ({ SendUpPhoto }) => {
  const [image, setImage] = useState({})

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setImage(URL.createObjectURL(event.target.files[0]));

    reader.onloadend = () => {
      const formData = new FormData();
      formData.append('image', file); // Assuming 'image' is the key used to store image data

      SendUpPhoto(formData); // Sending formData to parent component
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='addimglol'>
      <img className='editImg' alt="" src={image}></img>
      <label className='fileSelect'>
          <input type="file" onChange={handleFileInputChange} />
          Upload
      </label>
    </div>
  );
};

export default AddImageForm;