"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image'; 
import { setCartItems } from '../redux/cartSlice'; 
import Link from 'next/link';


export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Save cartItems to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Check if cartItems is empty
    if (cartItems.length === 0) {
        return (
            <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-16 flex flex-col gap-6 z-20">
                <div className="">Cart is Empty</div>
            </div>
        );
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity); // Assuming each item has a price and quantity
    }, 0);

    const handleRemoveFromCart = (productName, variant) => {
        // Remove the item from cartItems
        const updatedCartItems = cartItems.filter(item => !(item.productName === productName && item.variant === variant));
        dispatch(setCartItems(updatedCartItems)); // Update the cart in Redux
    };

    return (
        <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-16 flex flex-col gap-6 z-20">
            <h2 className="text-xl">Shopping Cart</h2>
            {/* LIST */}
            <div className="flex flex-col gap-8">
                {/* ITEM */}
                {cartItems.map((cartItem) => (
                    <div className="flex gap-4" key={`${cartItem.productName} ${cartItem.variant}`}>
                        {cartItem.imageUrl && ( // Assuming imageUrl is part of cartItem
                            <Image
                                src={cartItem.imageUrl}
                                alt={cartItem.productName}
                                width={72}
                                height={96}
                                className="object-cover rounded-md"
                            />
                        )}
                        <div className="flex flex-col justify-between w-full">
                            {/* TOP */}
                            <div className="">
                                {/* TITLE */}
                                <div className="flex items-center justify-between gap-8">
                                    <h3 className="font-semibold">
                                        {cartItem.productName} {cartItem.variant && `(${cartItem.variant})`}
                                    </h3>
                                    <span className="font-semibold">Tk. {cartItem.price.toFixed(2)}</span>
                                </div>
                                <div className="text-sm">Quantity: {cartItem.quantity}</div>
                            </div>
                            {/* BOTTOM */}
                            <div className="flex justify-between text-sm">
                                <span 
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() => handleRemoveFromCart(cartItem.productName, cartItem.variant)} // Remove item from cart
                                >
                                    Remove
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* BOTTOM */}
            <div className="">
                <div className="flex items-center justify-between font-semibold">
                    <span className="">Subtotal: Tk. {totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2 mb-4">
                    Shipping and taxes calculated at checkout.
                </p>
                <div className="flex justify-end text-sm">
                  
                <Link href="/checkout">
                <button
                    className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                >
                    Checkout
                </button>
            </Link>
                </div>
            </div>
        </div>
    );
}