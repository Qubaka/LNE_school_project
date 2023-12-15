
import Navbar from '../Navbar/Navbar';
import OfferFrame from '../OfferFrame/OfferFrame';
import './MainPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function MainPage(props) {

  const navigate = useNavigate();
  const CheckPermission = ()=>{
    if (sessionStorage.getItem("UserRole") === "banned"){
      navigate("/lbozo");
    }
  }

  //Array z ofertami

  //State z kategorią do filtrowania itemów
  const [Category, setCategory] = useState('null');
  //funkcja updatująca wyświetlne itemy po zmianie kategori
  const ChangeCategory = (event)=>{
    setCategory(event.target.value);
  }
  const CategoryFilter = (item)=>{
  
    return (Category === 'null' || (item.tag === Category)) && item.buyerId == null;
     
  }

  useEffect(() => {
    CheckPermission();
  }, [])

  return (
    <div id="MainPage">
      <form>
        <select onChange={ChangeCategory}>
          <option value="null">wszystkie</option>
          <option value="matma">matematyka</option>
          <option value="jp">język polski</option>
          <option value="ja">język angielski</option>
          <option value="jn">język niemiecki</option>
          <option value="jh">język hiszpański</option>
          <option value="wos">WOS</option>
          <option value="hist">historia</option>
          <option value="bio">biologia</option>
          <option value="geo">geografia</option>
          <option value="chem">chemia</option>
          <option value="fiz">fizyka</option>
        </select>
      </form>
      <Navbar></Navbar>
      <div className='offers'>
        {props.items.filter(CategoryFilter).map((object, key) => ( <OfferFrame key={key} item={object}></OfferFrame>))}
      </div>

    </div>
  );
}

export default MainPage;