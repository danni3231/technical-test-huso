import React, { useState, useEffect, useRef } from "react";

import Loader from "./Loader";
import Card from "./Card";
import "./InfiniteScrollList.css";

const InfiniteScrollList = ({ fetchItems }) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [Loading, setLoading] = useState(false); 
  const isFetching = useRef(false); 

  // Initial load and more data when making scroll
  const loadMore = async () => {
    if (isFetching.current || !hasMore) return;
    isFetching.current = true; 
    setLoading(true);

    const newItems = await fetchItems();
    await setItems((prevItems) => [...prevItems, ...newItems]);
    setHasMore(newItems.length > 0); // If new elements are not obtained, deactivate `hasmore`
    isFetching.current = false; 
    setLoading(false);
  };

  // Detects the scroll at the end of the page
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100 &&  !isFetching.current
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    loadMore(); // Initial load
    window.addEventListener("scroll", handleScroll); // Add the scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // Clean the listener when disassembling
  }, []); // Only runs once

  return (
    <div className="infinite_scroll_container">
      <div className="infinite_scroll_list">
        {items.map((user, index) => {
          return <Card key={index} image={user.image} name={user.name} email={user.email} />;
        })}
      </div>
      {Loading && <Loader />}
      {!hasMore && <p>No hay más elementos</p>}
    </div>
  );
};

export default InfiniteScrollList;
