import { useState } from 'react';
import { Link } from 'react-router-dom';
import './OfferFrame.css';

function OfferFrame(props) {
  //To co wyświetla się na obrazku oferty
  const [Offer,setOffer] = useState(props.item);
  const imageUrl = `http://localhost:3000${Offer.photo}`;
  return (
    <div className="OfferFrame">
      <div className='ActualOffer'>
        <div className='Image'>
          <img src={imageUrl} className='photo' alt='Photo'/>
        </div>
        <div className='Information'>
          <h6>{Offer.name}</h6>
          <p dangerouslySetInnerHTML={{ __html: Offer.description}}></p>
          <p>{Offer.price}zł</p>
        </div>

        <div className='sideInfo' style={Offer.userID  ==  sessionStorage.getItem("UserId") ? { display: 'none' } : { display: 'flex' }} >
          <Link to={"/offer/"+Offer._id}>More...</Link>
        </div>
      </div>
    </div>
  );
}

export default OfferFrame;