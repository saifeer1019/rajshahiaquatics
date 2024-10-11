"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image'; 
import { setCartItems } from '../redux/cartSlice'; // Import the setCartItems action

const Checkout = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [isMounted, setIsMounted] = useState(false); // Track if the component has mounted
    const [paymentMethod, setPaymentMethod] = useState('cash'); // Track selected payment method
    const [orderConfirmed, setOrderConfirmed] = useState(false); // Track if the order is confirmed

    // Set mounted state to true after the component mounts
    useEffect(() => {
        setIsMounted(true);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Check if cartItems is empty
    if (!isMounted) {
        return null; // Prevent rendering until mounted
    }

    // If cart is empty, show a message
    if (cartItems.length === 0 && !orderConfirmed) {
        return (
            <div className="flex flex-col p-4 bg-white shadow-md rounded-md w-[30vw] mx-auto">
                <h2 className="text-xl font-semibold my-4 self-center">Cart Empty</h2>
                <p>Your cart is currently empty. Please add items to your cart before proceeding to checkout.</p>
            </div>
        );
    }

    const shipping = 100;
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity) + shipping; // Assuming each item has a price and quantity
    }, 0);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Generate a unique OrderId
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Gather order data
        const orderData = {
            Name: event.target.fullName.value,
            Address: event.target.address.value,
            City: event.target.city.value,
            Phone: event.target.phone.value,
            'Payment Method': paymentMethod, // Ensure this matches the model
            'Payment Status': paymentMethod === 'bkash' ? 'Pending' : 'Not Confirmed', // Ensure this matches the model
            'Product Name': cartItems.map(item => `${item.productName} (${item.variant})`).join(', '), // Ensure this matches the model
            Price: totalPrice.toFixed(2), // Total price as a string
            Quantity: cartItems.reduce((total, item) => total + item.quantity, 0), // Total quantity
            'Order Date': new Date(), // Ensure this matches the model
            OrderId: orderId,
        };
    
        // Log the order data for debugging
        console.log('Order Data:', orderData);
    
        // Send order data to the backend
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
    
            if (response.ok) {
                setOrderConfirmed(true);
                dispatch(setCartItems([])); // Clear cart after successful order
            } else {
                console.error('Failed to submit order:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    return (
        <div className="flex flex-col p-4 bg-white shadow-md rounded-md w-[30vw] mx-auto">
            <h2 className="text-xl font-semibold my-4 self-center">Checkout</h2>
            <div className="flex flex-col gap-4">
                {/* Cart Items List */}
                {cartItems.map((cartItem) => (
                    <div className="flex gap-4" key={`${cartItem.productName} ${cartItem.variant}`}>
                        {cartItem.imageUrl && (
                            <Image
                                src={cartItem.imageUrl}
                                alt={cartItem.productName}
                                width={72}
                                height={96}
                                className="object-cover rounded-md"
                            />
                        )}
                        <div className="flex flex-col justify-between w-full">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">
                                    {cartItem.productName} {cartItem.variant && `(${cartItem.variant})`}
                                </h3>
                                <span className="font-semibold">Tk. {cartItem.price.toFixed(2)}</span>
                            </div>
                            <div className="text-sm">Quantity: {cartItem.quantity}</div>
                        </div>
                    </div>
                ))}
            </div>
            {!orderConfirmed && (<>
            <div className="flex items-center justify-between font-semibold mt-8 mb-2 self-end">
                <span className="">Shipping: Tk. {shipping}.00</span>
            </div>

            <div className="flex items-center justify-between font-semibold mb-4 self-end">
                <span className="">Total: Tk. {totalPrice.toFixed(2)}</span>
            </div>

            {/* Shipping Information Form */}
        
            <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
                <h3 className="text-lg font-semibold mt-4">Shipping Information</h3>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="border rounded-md p-2"
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="border rounded-md p-2"
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="border rounded-md p-2"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="border rounded-md p-2"
                    required
                />
                {/* Payment Method Selection */}
                <h3 className="text-lg font-semibold mt-4">Payment Method</h3>
                <div className="flex flex-col gap-2">
                    <label>
                        <input
                            type="radio"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={handlePaymentMethodChange}
                        />
                        {" Cash on Delivery (We will have online payment soon)"}
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-lama text-white py-2 rounded-md hover:bg-lama-dark"
                >
                    {paymentMethod === 'bkash' ? 'Pay Now and Complete Order' : 'Complete Order'}
                </button>
            </form>
            </>
            )}
            {orderConfirmed && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-600 rounded-md">
                    <h3 className="font-semibold">Order Submitted Successfully! We will call you soon!</h3>
                 
                </div>
            )}
        </div>
    );
};

export default Checkout;