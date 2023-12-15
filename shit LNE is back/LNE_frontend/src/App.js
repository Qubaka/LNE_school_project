import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import AddItemsPage from './components/AddItemsPage/AddItemsPage';
import MainPage from './components/MainPage/MainPage';
import DefaultLayout from './components/DefaultLayout/DefaultLayout';
import ErrorPage from './components/ErrorPage/ErrorPage';
import OfferPage from './components/OfferPage/OfferPage';
import UserPage from './components/UserPage/UserPage';
import ChatsPage from './components/ChatsPage/ChatsPage';
import LoginPage from './components/LoginPage/LoginPage';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Logout from './components/Logout/Logout';
import Banned from './components/Banned/Banned';
import BoughtItems from './components/BoughtHistory/BoughtHistory';



//const TestArray = [{id:"id_1", info: "bułka"}, {id:"id_2", info: "ksionszka"}, {id:"id_3", info: "dugopis"}, {id:"id_4", info:"piurnik"}];

function App() {

  const [itemsArray,setItems] = useState([]);

  //Funkcja do pobieranie itemów z bazy danych
  const GetItems = async()=>{
    const response = await axios.get('http://localhost:3000/getItems');
    console.log(response.data)
    await setItems(response.data)


  }
  // Tutaj się pobierają itemy
  useEffect(() => {
    GetItems();
    //console.log(sessionStorage.getItem("UserId"));

  }, [])
  
  //Definicje routów do stron i podstron
  const router = createBrowserRouter ([
    {path: "/", element: <DefaultLayout/>, errorElement: <ErrorPage/>,
    children:[
      {path: "/", element: <MainPage items={itemsArray} />},
      {path: "/additem", element: <AddItemsPage/>},
      {path: "/userpage", element: <UserPage items={itemsArray}/>},
      {path: "/chats", element: <ChatsPage/>},
      {path: "/login", element: <LoginPage/>},
      {path: "/logout", element: <Logout></Logout>},
      {path: "/register", element: <RegisterPage/>},
      {path: "/AdminPanel", element: <AdminPanel/>},
      {path: "/offer", children: itemsArray.map((object) =>({path: "/offer/"+object._id, element:<OfferPage offer={object}></OfferPage> }))},
      {path: "/offer/*", element: <MainPage items={itemsArray}/>},
      {path: "/boughtHistory", element: <BoughtItems/>},
      {path: "/lbozo", element: <Banned/>},
  ]},
  ])



  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
