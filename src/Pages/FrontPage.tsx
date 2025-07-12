import './FrontPage.css'
import Sidebar from '../components/sidebar/Sidebar'
import DataTable from '../components/DataTable/DataTable'
import { useEffect, useState } from 'react'
import socket from '../Utils/socket'
const FrontPage = () => {
  const [marketData, setMarketData] = useState([]);


  useEffect(()=>{
    // ✅ Log on first render
    console.log("Socket ID:", socket.id);

    // ✅ Listen to sidebar event ONCE
    

    socket.on('market:data',(market_data)=>{
      setMarketData(market_data)
    })

    // ✅ Clean up on unmount
    return () => {
      socket.off('sidebar');
    };
  },[])
  return (

    <div className='FrontPage_parentDiv'>
        <div className='main_layout'>
            <Sidebar/>
            <DataTable marketData={marketData}/>
        </div>
    </div>
  )
}

export default FrontPage