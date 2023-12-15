import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ReportPopUp.css';
import { useState } from 'react';

function ReportPopUp(props) {
  const navigate = useNavigate();
  const [title,setTitle] = useState();
  const [description,setDescription] = useState();
  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  }
  const onChangeDescHandler = (e) => {
    setDescription(e.target.value);
  }
  const Report = async()=>{
    const response = await axios.post('http://localhost:3000/report/'+ props.userId, {title : title, description : description});
    console.log(response)
    navigate("/");
  }
  return (
    /*jak cos hidden jest w css od offer page ten popup */
    <div id="report">
        <input placeholder='Title of report' onChange={onChangeTitleHandler}/>
        <input placeholder='Report description' onChange={onChangeDescHandler}/>
        <button className="reportBut" onClick={Report}>Report</button>
    </div>
  );
}

export default ReportPopUp;