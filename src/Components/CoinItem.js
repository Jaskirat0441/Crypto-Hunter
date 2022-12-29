import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../Context/CryptoContext";
import CoinInfo from "../Pages/CoinInfo";
import "./CoinTable.css";

const CoinItem = (props) => {
  const navigate = useNavigate();
  const { symbol } = CryptoState();

  const profit = props.coins.price_change_percentage_24h > 0;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div
      className="coin-row"
      onClick={() => navigate(`/coins/${props.coins.id}`)}
      element={<CoinInfo />}
    >
      <p>{props.coins.market_cap_rank}</p>
      <div className="img-symbol">
        <img src={props.coins.image} alt="" />
        <p>{props.coins.symbol.toUpperCase()}</p>
      </div>
      <p>
        {symbol} {props.coins.current_price.toLocaleString()}
      </p>
      <p
        style={{
          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
          fontWeight: 500,
        }}
      >
        {" "}
        {profit && "+"}
        {props.coins.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p>
        {" "}
        {symbol}{" "}
        {numberWithCommas(props.coins.market_cap.toString().slice(0, -6))}M
      </p>
      {/* <p className='hide-mobile'>{props.coins.market_cap.toLocaleString()}</p> */}
      {/* <p className='hide-mobile'>{props.coins.current_price.toLocaleString()}</p> */}
    </div>
  );
};

export default CoinItem;
