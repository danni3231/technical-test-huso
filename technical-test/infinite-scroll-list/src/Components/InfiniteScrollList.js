import React, { useState, useEffect } from "react";

import Loader from "./Loader";
import Card from "./Card";
import "./InfiniteScrollList.js";

const InfiniteScrollList = ({ fetchItems }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initial load and more data when making scroll
  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const newItems = await fetchItems();
    setItems((prevItems) => [...prevItems, ...newItems]);
    setHasMore(newItems.length > 0); // If new elements are not obtained, deactivate `hasmore`
    setLoading(false);
  };

  // Detects the scroll at the end of the page
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
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
          return <Card key={index} image={user.image} name={user.name} />;
        })}
      </div>
      {loading && <Loader />}
      {!hasMore && <p>No hay más elementos</p>}
    </div>
  );
};

export default InfiniteScrollList;
