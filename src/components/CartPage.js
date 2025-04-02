import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        if (userId) {
            fetchCart();
        }
    }, [userId]);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:5500/api/cart/user/${userId}`);
            setCartItems(response.data);
        } catch (error) {
            console.error("장바구니 불러오기 실패:", error);
        }
    };

    const handleRemove = async (cartId) => {
        try {
            await axios.delete(`http://localhost:5500/api/cart/${cartId}`, { data: { user_id: userId } });
            setCartItems(cartItems.filter(item => item.cart_id !== cartId));
        } catch (error) {
            console.error("삭제 실패:", error);
        }
    };

    return (
        <div>
            <h2>🛒 장바구니</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.cart_id}>
                            {item.part_name} - {item.price} 원
                            <button onClick={() => handleRemove(item.cart_id)}>❌ 삭제</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>장바구니가 비어 있습니다.</p>
            )}
        </div>
    );
}

export default CartPage;
