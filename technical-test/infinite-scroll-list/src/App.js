import React, {useRef} from "react";
import axios from "axios";

import "./App.css";
import InfiniteScrollList from "./Components/InfiniteScrollList";

function App() {
  const page = useRef(1); // Referencia a la página actual

  const fetchItems = async () => {

    return new Promise((resolve) => {
      setTimeout(async () => {
        const response = await axios.get("https://randomuser.me/api/", {
          params: {
            results: 5, // Número de usuarios por página
            page: page.current, // Página actual
            seed:"Daniel-rojas"
          },
        });

        page.current++; // Incrementa la página actual

        const users = response.data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          image: user.picture.thumbnail,
        }));

        resolve(users);
        
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
