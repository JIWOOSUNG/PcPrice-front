import React from "react";
import "../../styles/PartList.css"; 

function PartList({ parts, onPartClick, onAddToCart  }) {
    return (
        <ul className="part-list">
            {parts.map((part, index) => (
                <li key={index} className="part-item" onClick={() => onPartClick(part.name)}>
                    <img src={part.imageUrl} alt={part.name} />
                    <p>{part.name}</p>
                    <p className="price">{part.price} 원</p>
                    <button className="cart-btn" onClick={() => onAddToCart(part.id)}>🛒 장바구니 추가</button>
                </li>
            ))}
        </ul>
    );
}

export default PartList;