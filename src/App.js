import React,{useState,useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import CoinsTable from "./Components/CoinsTable";
import Navbar from "./Components/Navbar";
import { CryptoState } from "./Context/CryptoContext";
import CoinInfo from "./Pages/CoinInfo";
function App() {
  return (
   <>
   <Navbar/>
   <Routes>
    <Route path="/" element={ <CoinsTable/>}/>
    {/* <Route path="/coin/" element={ <CoinInfo/>}/> */}
    <Route path="/coins/:coinId" element={  <CoinInfo/>}/>
   </Routes>
   </>
  );
}

export default App;
