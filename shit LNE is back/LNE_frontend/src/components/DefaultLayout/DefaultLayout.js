import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './DefaultLayout.css';
import Navbar from '../Navbar/Navbar';

function DefaultLayout() {
  return (
    <div id="DefaultLayout">
      {/* <Navbar></Navbar> */}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default DefaultLayout;