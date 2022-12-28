import React from 'react'
import CoinItem from './CoinItem'
import './CoinTable.css';
const CoinsTable = (props) => {
  return (
    <div className='container'>
        <div>
        <div className="heading">
        <p>#</p>
        <p className='coin-name'>Coin</p>
        <p>Price</p>
        <p>24h</p>
        <p className='hide-mobile'>Voulme</p>
        <p className='hide-mobile'>Mkt Cap</p>
        </div>
{/* rows */}

{props.coins.map(coins =>{
    return(
        <CoinItem coins={coins} key={coins.id}  />
    )
})}

        </div>
    </div>
  )
}

export default CoinsTable