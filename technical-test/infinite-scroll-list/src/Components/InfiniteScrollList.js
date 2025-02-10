import React from "react";

import Card from "./Card";
import "./InfiniteScrollList.js";



const InfiniteScrollList = ({ data }) => {

  
    return (
        <div className='infinite_scroll_list'>
            {data.map((user, index) => {
                return (
                    <Card
                        key={index}
                        image={user.image}
                        name={user.name}
                    />
                );
            })}
        </div>
    );
};

export default InfiniteScrollList;