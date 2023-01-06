import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CoinInfo.css";
import DOMPurify from 'dompurify'
import { CryptoState } from "../Context/CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
// import { db } from "../firebase";


const CoinInfo = () => {
  const [coinInfo, setCoinInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const{currency,symbol,user,watchlist,setWatchlist,setAlert,alertVisible}= CryptoState();
  const [coin, setCoin] = useState();



  const params = useParams();
  const{id}= useParams();

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setLoading(true);
        setCoinInfo(res.data);
        setLoading(false);
        console.log(res.data)

      })
      .catch((err) => {
        console.log(err);
        setLoading(true);

      });
  }, []);

  const inWatchlist = watchlist.includes(coinInfo?.id);

  
  const addToWatchlist = async () => {
    console.log("first")
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coinInfo?.id] : [coinInfo?.id] },
        // { merge: true }
      );
      console.log("add")

      setAlert({
        open: true,
        message: `${coinInfo.name} Added to the Watchlist !`,
        type: "success",
      });
      alertVisible();
    } catch (err) {
      setAlert({
        open: true,
        message: err.message,
        type: "error",
      });
      alertVisible();
      console.log(err.message);
    }
  };

  const removeFromWatchlist =async()=>{
    const coinRef = doc(db,"watchlist",user.uid);
  
    
    try {
      await setDoc(coinRef,{
        // coins:watchlist?[...watchlist,coin?.id]:[coin?.id]},
        coins :watchlist.filter((watch)=>watch !==coinInfo?.id),},
       {merge:'true'}
      );
      console.log("watchlist added");

      setAlert({
        open:true,
        message:`${coinInfo.name} Remove From  Watchlist !`,
        type:"success",
      })
      alertVisible();
    } catch (err) {
      setAlert({
        open:true,
        message:err.message,
        type:"danger",
      })
      alertVisible();
      console.log(err.message)
    };
  }

  const numberWithCommas=(x)=>  {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
       {loading ? (
            <div className="loader"></div>
          ) : (
      <div className="coin-container">
        <div className="content">
          <h1>{coinInfo.name}</h1>
          {user &&
          <button className="btn "  style={{
            width: "100%",
            height: 40,
            backgroundColor: inWatchlist ? "#ff0000" : "#6900ff",
          }} onClick={inWatchlist ? (()=> removeFromWatchlist()): (()=> addToWatchlist())}>{inWatchlist ? "Remove from Watchlist" :"Add To Watchlist"}</button>
        }
        </div>
        <div className="content">
          <div className="rank">
            <span className="rank-btn">Rank#{coinInfo.market_cap_rank}</span>
          </div>
          <div className="info">
            <div className="coin-heading">
              {coinInfo.image ? <img src={coinInfo.image.small} alt="" /> : ""}
              <p>{coinInfo.name}</p>
              <p>{coinInfo.symbol}</p>
            </div>
            <div className="coin-price">
              {coinInfo.market_data?.current_price ? (
                <h1>
                  {symbol}{coinInfo.market_data.current_price[currency.toLowerCase()]}
                </h1>
              ) : null}
            </div>
          </div>
        </div>
        <div className="content">
          <table>
            <thead>
              <tr>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>14d</th>
                <th>30d</th>
                <th>1yr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {coinInfo.market_data
                    ?.price_change_percentage_1h_in_currency ? (
                    <p>
                      {coinInfo.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coinInfo.market_data
                    ?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coinInfo.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coinInfo.market_data
                    ?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coinInfo.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coinInfo.market_data
                    ?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coinInfo.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coinInfo.market_data
                    ?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coinInfo.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coinInfo.market_data
                    ?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coinInfo.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="content">
          <div className="stats">
          <div className="left-stats">
            <div className="row">
              <h4>24 Hour Low</h4> 
              {coinInfo.market_data?.low_24h ? <p>{symbol}{coinInfo.market_data.low_24h[currency.toLowerCase()]}</p> : null}

            </div>
             <div className="row">
              <h4>24 Hour Hight</h4>
              {coinInfo.market_data?.high_24h ? <p>{symbol}{coinInfo.market_data.high_24h[currency.toLowerCase()]}</p> : null}                            

            </div>
              </div>
               <div className="right-stats">
            <div className="row">
              <h4>Market Cap</h4>
              {coinInfo.market_data?.market_cap ? <p>{symbol}{numberWithCommas(coinInfo.market_data.market_cap[currency.toLowerCase()])}M</p> : null}
 
            </div>
             <div className="row">
              <h4>Circulating Supply</h4>
              {coinInfo.market_data ? <p>{coinInfo.market_data.circulating_supply}</p> : null}

            </div>
              </div>
          </div>
        </div>
        <div className="content">
          <div className="about">
            <h3>About</h3>
              <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coinInfo.description ? coinInfo.description.en : ''),
                        }}></p>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default CoinInfo;
