import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useEffect, useState } from 'react';
import './BoughtHistory.css'

function BoughtItems(props) {
    const [response, setResponse] = useState([]);

    const getBoughtItems = async () => {
      try {
        const result = await axios.get('http://localhost:3000/getBoughtItems/' + sessionStorage.getItem("UserId"));
        setResponse(result.data); // Assuming result.data contains the array of bought items
        console.log(result.data); // Logging the received data directly
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    }
    
    useEffect(() => {
      getBoughtItems();
    }, []);
    
    return (
      <div id="BoughtItems">
        <Navbar />
        <h1 className='hist'>History</h1>
        <div className='offers'>
          {response.map((object, key) => (
            <div className='ActualOffer'>
                <h2 className='itemTitle' key={key}>{object.name}</h2>
                <div className='descItems'>
                  <p>{object.description}</p>
                  <p className='shipStat'>Delivery Status: In Progress</p>
                </div>
            </div>
                
          ))}
        </div>
      </div>
    );
}

export default BoughtItems;