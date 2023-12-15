import { useState, useEffect } from 'react';
import './AdminPanel.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Report from './report';
import Users from './users';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {

  const navigate = useNavigate();

    //Ilos Uzytkownikow
    const [AmountOfUsers,setAmountOfUsers] = useState()
    //Ilosc Reportow
    const [AmountOfReports,setAmountOfReports] = useState()
    //Czy menu Users jest rozwiniete
    const [UsersData,setUsersData] = useState(false)
    //Czy menu Reports jest rozwiniete
    const [ReportsData,setReportsData] = useState(false)
    //Reporty Uzytkownikow
    const [reportsArray,setReportsArray] = useState([]);
    //Uzytkownicy
    const [usersArray, setUsersArray] = useState([]);
    //Pokazywanie Uzytkownikow(rozwijanie menu)
    const ShowUsers=()=>{
        if(UsersData){
            setUsersData(false)
        }else{
            setUsersData(true)
        }
    }
    //Pokazywanie reportow(rozwijanie menu)
    const ShowReports=()=>{
        if(ReportsData){
            setReportsData(false)
            console.log(reportsArray)
        }else{
            setReportsData(true)
        }
    }
    

    const GetReports = async()=>{
      const response = await axios.get('http://localhost:3000/reports');
      console.log(response.data)
      setReportsArray(response.data)
      let i = 0;
      response.data.map(items => {
        i += 1
        return i
      })

      setAmountOfReports(i)
    }

    const GetUsers = async()=>{
        const response = await axios.get('http://localhost:3000/getUser');
        console.log(response.data)
        setUsersArray(response.data)
        let i = 0;
        response.data.map(items => {
            i += 1
            return i 
        })
        setAmountOfUsers(i)
    }
    
    const ReloadReports = async()=>{
      const response = await axios.get('http://localhost:3000/reports');
      console.log(response.data)
      setReportsArray(response.data)
    }
    const ReloadUsers = async()=>{
        const response = await axios.get('http://localhost:3000/getUser');
        console.log(response.data)
        setUsersArray(response.data)
      }

    const CheckPermission = ()=>{
      if (sessionStorage.getItem("UserRole") !== "admin"){
        navigate("/");
      }
    }
    useEffect(() => {
      CheckPermission();
      GetReports();
      GetUsers();
    }, [])
  return (
    <div id="AdminPanel">
      <Navbar></Navbar>
        {/* <div className="Header">
            <h1>Admin Panel</h1>
            <div className='BackButton'><Link to="/">Powrót</Link></div>
        </div> */}
            <div className='data'>
              <h5>Users: {AmountOfUsers}</h5> <h5>Reports: {AmountOfReports}</h5>
            </div>
            <div className='midler'>
              <div className='Users' onClick={ShowUsers}>
                <h3 className='AlomostButton'>Użytkownicy</h3>
                {usersArray.map(user => (
                    <div key={user._id} style={{ display: UsersData ? 'block' : 'none', maxHeight: UsersData ? 'fit-content' : '200px' }}>
                        <Users onChangeUsers = {ReloadUsers} id={user._id} email={user.email} role={user.role} />
                    </div>
                ))}
              </div>
              <div className='Reports' onClick={ShowReports}>
                  <h3 className='AlomostButton'>Reporty</h3>
                  {reportsArray.map(report => (
                      <div key={report._id} style={{ display: ReportsData ? 'block' : 'none', maxHeight: ReportsData ? 'fit-content' : '200px' }}>
                          <Report onChangedReports = {ReloadReports} id={report._id} IdOfReportedUser = {report.IdOfReportedUser}  title={report.title} description={report.description} />
                      </div>
                  ))}
              </div>
            </div>
    </div>
  );
}

export default AdminPanel;