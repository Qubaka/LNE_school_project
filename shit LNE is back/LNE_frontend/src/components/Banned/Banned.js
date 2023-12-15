import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Banned.css';


function Banned() {
  //const navigate = useNavigate();

  useEffect(() => {

  })

  return (
    <div id="Banned">
      <Navbar></Navbar>
      <div>
        <h2 className='urbanned'>Skontaktuj się z administracją strony</h2>
        <button>Kontakt</button>
      </div>
    </div>
  );
}

export default Banned;