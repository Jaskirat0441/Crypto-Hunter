import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../Context/CryptoContext";
import CoinItem from "./CoinItem";
import "./CoinTable.css";
import Banner from "./Banner";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency } = CryptoState();

  // const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'

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

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  return (
    <>
      <Banner />

      <div className="container">
        {/* <h4 className="table_cont_heading">
        {" "}
        Cryptocurrency Prices by Market Cap
      </h4> */}
        <fieldset>
          <legend> Search For a Crypto Currency..</legend>
          <br></br>
          <input
            className="search-field"
            type="text
"
            onChange={(e) => setSearch(e.target.value)}
          />
        </fieldset>

        <div className="heading">
          <p>#</p>
          <p className="coin-name">Coin</p>
          <p>Price</p>
          <p>24h Change</p>
          {/* <p className="hide-mobile">Voulme</p> */}
          <p className="hide-mobile">Mkt Cap</p>
        </div>
        {/* rows */}
        {loading ? (
          <div className="loader"></div>
        ) : (
          handleSearch()
            // .slice((page - 1) * 10, (page - 1) * 10 + 10)
            .map((coins) => {
              return <CoinItem coins={coins} key={coins.id} />;
            })
        )}
      </div>
    </>
  );
};

export default CoinsTable;
