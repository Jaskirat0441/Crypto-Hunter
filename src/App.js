import axios from "axios";
import React,{useState,useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import CoinsTable from "./Components/CoinsTable";
import Navbar from "./Components/Navbar";
import CoinInfo from "./Pages/CoinInfo";
function App() {

  const [coins,setCoins]= useState([]);

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'


  useEffect(()=>{
    axios.get(url).then((res)=>{
      setCoins(res.data);
      console.log(res.data);

    }).catch((err)=>{
      console.log(err);
    })
  },[]);

  return (
   <>
   <Navbar/>
   <Routes>
    <Route path="/" element={ <CoinsTable coins={coins}/>}/>
    {/* <Route path="/coin/" element={ <CoinInfo/>}/> */}
    <Route path="/coins/:coinId" element={  <CoinInfo/>}/>
   </Routes>
   </>
  );
}

export default App;
