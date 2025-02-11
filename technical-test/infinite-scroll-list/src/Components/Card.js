import React from "react";

import "./Card.css";


const Card = ({ image, name, email }) => {
    return (
        <div className='card'>
            <div className='card_image'>
                <img src={image} alt={name} />
            </div>
            <div className='card_info'>
                <h2>{name}</h2>
                <h3>{email}</h3>
            </div>
        </div>
    );
};

export default Card;