import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Logout() {
  const navigate = useNavigate();
  const LogoutUser = ()=>{
    sessionStorage.clear("UserId");
    sessionStorage.clear("UserRole");
    console.log(sessionStorage.getItem("UserId"));
    navigate("/");
  }
  useEffect(() => {
    LogoutUser();
  })


  return (
    <div id="Logout">
      <div>

      </div>
    </div>
  );
}

export default Logout;