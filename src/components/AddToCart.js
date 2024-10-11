"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, setCartItems } from '../redux/cartSlice'; // Adjust the path as necessary

export default function AddToCart({ 
    productName, 
    variant = "", 

    quantity = 1, 
 
  
    price, 
    image 
}) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [isInCart, setIsInCart] = useState(cartItems.some(item => item.productName === productName && item.variant === variant));

    useEffect(() => {
        // Check if the item is in the cart after the component mounts
        setIsInCart(cartItems.some(item => item.productName === productName && item.variant === variant));
    }, [cartItems, productName, variant]);

    const handleAddToCart = () => {
        const existingItem = cartItems.find(item => item.productName === productName && item.variant === variant);
        
        if (existingItem) {
            // If it exists, update the quantity
            const updatedCartItems = cartItems.map(item => 
                item.productName === productName && item.variant === variant
                    ? { ...item, quantity: item.quantity + quantity } // Increase quantity
                    : item
            );
            dispatch(setCartItems(updatedCartItems));
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
            // Otherwise, add a new item
            const newItem = { productName, quantity, variant, price, imageUrl: image };
            const updatedCartItems = [...cartItems, newItem];
            dispatch(setCartItems(updatedCartItems));
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
        
        setIsInCart(true); // Update local state
    };

    const handleRemoveFromCart = () => {
        const updatedCartItems = cartItems.filter(item => !(item.productName === productName && item.variant === variant));
        dispatch(setCartItems(updatedCartItems));
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setIsInCart(false); // Update local state
    };

    return (
        <div>
            {/* Conditionally render buttons based on whether the item is in the cart */}
            {!isInCart ? ( // If the item is NOT in the cart
                <button 
                    onClick={handleAddToCart} // Pass the function reference
                    className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white"
                >
                    Add to Cart
                </button>
            ) : ( // If the item IS in the cart
                <button 
                    onClick={handleRemoveFromCart} // Pass the function reference
                    className="rounded-2xl ring-1 ring-red-500 text-red-500 w-max py-2 px-4 text-xs hover:bg-red-500 hover:text-white"
                >
                    Remove from Cart
                </button>
            )}
        </div>
    );
}