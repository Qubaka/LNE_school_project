import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BuyPopuo.css';

function BuyPopUp(props) {
  const navigate = useNavigate();
  const Buy = async()=>{
    const response = await axios.post('http://localhost:3000/buy/' + sessionStorage.getItem("UserId") +"/"+ props.itemId)
    console.log(response)
    navigate("/");
  }
  return (
    /*jak cos hidden jest w css od offer page ten popup */
    <div id="Buy">
        <h1>{props.name}</h1>
        <p>{props.descripton}</p>
        <p>Price: {props.price}zł</p>
        {/* <p>{props.photo}</p> */}
        <input placeholder="City"></input> <br></br>
        <input placeholder="Street and Flat number"></input> <br></br>
        <input placeholder="Country"></input> <br></br>
        <button className="buyBut" onClick={Buy}>Buy Now</button>
    </div>
  );
}

export default BuyPopUp;