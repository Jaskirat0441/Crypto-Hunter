import React from 'react'
import { useNavigate } from 'react-router-dom';
import CoinInfo from '../Pages/CoinInfo';
import './CoinTable.css';


const CoinItem = (props) => {
  const navigate = useNavigate();

  return (
    <div className='coin-row' onClick={()=>navigate(`/coins/${props.coins.id}`)} element={<CoinInfo/>}>
        <p>{props.coins.market_cap_rank}</p>
        <div className="img-symbol">
            <img src={props.coins.image} alt="" />
            <p>{props.coins.symbol.toUpperCase()}</p>
        </div>
        <p>{props.coins.current_price.toLocaleString()}</p>
        <p>{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
        <p>{props.coins.total_volume}</p>
        <p className='hide-mobile'>{props.coins.market_cap.toLocaleString()}</p>
        <p className='hide-mobile'>{props.coins.current_price.toLocaleString()}</p>
    </div>
  )
}

export default CoinItem