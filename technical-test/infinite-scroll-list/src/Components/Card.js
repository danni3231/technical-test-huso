import React from "react";

import "./Card.css";


const Card = ({ image, name }) => {
    return (
        <div className='card'>
            <div className='card_image'>
                <img src={image} alt={name} />
            </div>
            <div className='card_info'>
                <h2>{name}</h2>
            </div>
        </div>
    );
};

export default Card;