import React,{useState,useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Alert from "./Components/Alert";
import CoinsTable from "./Components/CoinsTable";
import Navbar from "./Components/Navbar";
import { CryptoState } from "./Context/CryptoContext";
import CoinInfo from "./Pages/CoinInfo";
function App() {
  const{alert,setAlert,alertVisible} = CryptoState();
    console.log(alert.open);
    let alert_type= alert.type;
    let alert_open= alert.open;
  return (
   <>
   <Navbar/>
   {alert.open && <Alert/>}
   <Routes>
    <Route path="/" element={ <CoinsTable/>}/>
    {/* <Route path="/coin/" element={ <CoinInfo/>}/> */}
    <Route path="/coins/:coinId" element={  <CoinInfo/>}/>
   </Routes>
   </>
  );
}

export default App;
