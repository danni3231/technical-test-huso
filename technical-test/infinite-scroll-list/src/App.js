import React from "react";
import axios from "axios";

import "./App.css";
import InfiniteScrollList from "./Components/InfiniteScrollList";

function App() {

  const fetchItems = async () => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`
        );

        resolve(response.data);
        
      }, 1500);
    });
  };

  return (
    <div className="App">
      <h1> Scroll infinito</h1>
      <InfiniteScrollList fetchItems={fetchItems} />
    </div>
  );
}

export default App;
