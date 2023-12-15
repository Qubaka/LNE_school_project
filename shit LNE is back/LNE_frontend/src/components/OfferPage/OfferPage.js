import { useState } from 'react';
import './OfferPage.css';
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './OfferPage.css';
import BuyPopUp from '../BuyPopup/BuyPopup';
import axios from 'axios';
import ReportPopUp from '../ReportPopUp/ReportPopUp';


function OfferPage(props) {
  const [popUpVisibility,setPopUpVisibility] = useState(false);
  const [popReportUpVisibility,setReportPopUpVisibility] = useState(false);
  const [popUpVisibility_delete,setPopUpVisibility_delete] = useState(false)
  
  const navigate = useNavigate();
  const CheckPermission = ()=>{
    if (sessionStorage.getItem("UserRole") === "banned"){
      navigate("/lbozo");
    }
  }
  
  const PopUpClickHandler= ()=>{
    setPopUpVisibility(!popUpVisibility);
  }

  const PopUpReportHandler= ()=>{
    setReportPopUpVisibility(!popReportUpVisibility);
  }

  const PopUpDeleteHandler= ()=>{
    setPopUpVisibility_delete(!popUpVisibility_delete);
  }
  const DeleteItem= async()=>{
    const response = await axios.post('http://localhost:3000/delItem/' + Offer._id);
    console.log(response);
    console.log("usuń item tutej")
    navigate('/userpage');
    
  }

  useEffect(() => {
    CheckPermission();
  }, [])
  const imageUrl = `http://localhost:3000${props.offer.photo}`;
  const [Offer,setOffer] = useState(props.offer);
  return (
    <div id="OfferPage">
      <Navbar></Navbar>
      <div className='imgcont'>
        <img src={imageUrl} alt=''/>
      </div>
      <button className='reportButton' onClick={PopUpReportHandler}><img src='/report.svg'></img></button>
      <h1 className='offerh1'>{Offer.name}</h1>
      <p className='offerp' dangerouslySetInnerHTML={{ __html: Offer.description}}></p>
      <div style={Offer.userId !=  sessionStorage.getItem("UserId") ? { display: 'flex' } : { display: 'none' } }>
        <button className='orderbutton' onClick={PopUpClickHandler}>Order</button>
      </div>
      <div className='ReportPopUp' style={popReportUpVisibility ? { display: 'flex' } : { display: 'none' }}>
        <button className='clickOut' onClick={PopUpReportHandler}>X</button>
        <ReportPopUp
          itemId={Offer._id}
          name={Offer.name}
          description={Offer.description}
          price={Offer.price}
          photo={Offer.photo}
          userId = {Offer.userId}
        />
      </div>
      <div style={Offer.userId ==  sessionStorage.getItem("UserId") ? { display: 'flex' } : { display: 'none' } }>
        <button onClick={PopUpDeleteHandler}>Delete this Offer</button>
      </div>
      <div className='PopUp' style={popUpVisibility_delete ? { display: 'flex' } : { display: 'none' }}>
        <button className='clickOut' onClick={PopUpDeleteHandler}>X</button>
        <p>Are you sre you want to delete this item?</p>
        <button onClick={DeleteItem} >Fuck this item</button>
      </div>
      <div className='PopUp' style={popUpVisibility ? { display: 'flex' } : { display: 'none' }}>
        <button className='clickOut' onClick={PopUpClickHandler}>X</button>
        <BuyPopUp
          itemId={Offer._id}
          name={Offer.name}
          description={Offer.description}
          price={Offer.price}
          photo={Offer.photo}
        />
      </div>
    </div>
  );
}

export default OfferPage;