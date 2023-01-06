import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const Crypto= createContext();

const CryptoContext =({children})=>{
      const[currency,setCurrency] = useState("INR");
        const[symbol,setSymbol]= useState("₹");
        const [user, setUser] = useState(null);
        const [watchlist, setWatchlist] = useState([]);
        const [coins, setCoins] = useState([]);
        const [loading, setLoading] = useState(false);
    //    const [alertVisible, setAlertVisible] = useState("hidden");
       const alertVisible=()=>{
        setTimeout(() => {
            setAlert({
              open:false
            })
          }, 3000);
       }


        const [alert, setAlert] = useState({
            open:false,
            message:"",
            type:"success",
            // visible:alertVisible
        })
        // fetch data
        
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setLoading(true);
        setCoins(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, [currency]);

        useEffect(() => {
          if(user){
            const coinRef = doc(db,"watchlist",user.uid);
           var unSubscribe= onSnapshot(coinRef,coin=>{
                if(coin.exists()){
                    console.log(coin.data().coins);
                    setWatchlist(coin.data().coins);
                    console.log("context");
                }
                else{
                    console.log("No items in watchlist")
                }
            })

            return ()=>{
                unSubscribe();
            }
        }
        
        }, [user])
        
        useEffect(() => {
            onAuthStateChanged(auth,user =>{

                if(user){
                    setUser(user);
                }
                else{
                    setUser(null);
                }
                console.log(user);
            })
        }, [user])
        

        useEffect(() => {
            if(currency==="INR"){
                setSymbol("₹");
            }
            else if(currency==="USD"){
                setSymbol("$");
            }
        }, [currency])
        
    return(
        <Crypto.Provider value={{alertVisible,coins,loading,currency,setCurrency,symbol ,alert,setAlert,user,watchlist}}>
            {children}
        </Crypto.Provider>
    )
}
export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
  };