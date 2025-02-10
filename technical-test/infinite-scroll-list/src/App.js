import React, { useEffect, useState } from "react";
import axios from "axios";

import './App.css';
import InfiniteScrollList from "./Components/InfiniteScrollList";
import Loader from "./Components/Loader";

const PAGE_NUMBER = 1;

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [loading, setLoading] = useState(false);


  const fetchItems = async () => {

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=${page}&sparkline=false`
    );

    setData((prev) => {
      return [...prev, ...response.data];
    });

     setLoading(false);

  };

  useEffect(() => {

    setTimeout(() => {
      fetchItems();
    }, 3000);

  }, [page]);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } =
      document.documentElement;

      console.log("buscando...");

    if (scrollTop + clientHeight >= scrollHeight-1 ) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="App">
      <h1> Scroll infinito</h1>
      <InfiniteScrollList data={data} />
      {loading && <Loader />}
    </div>
  );
}

export default App;
