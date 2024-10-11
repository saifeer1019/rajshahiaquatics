"use client";

import { useWixClient } from "../hooks/useWixClient";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, setCartItems } from '../redux/cartSlice';

const Add = ({
  productName,
  variant,
  stockNumber,
  quantity,
  setQuantity,
  setSelectedVariant,
  selectedVariant,
  price,
  image
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isInCart, setIsInCart] = useState(cartItems.some(item => item.productName === productName && item.variant === variant));

  // useEffect(() => {
  //   // Check if the item is in the cart after the component mounts
  //   setIsInCart(cartItems.some(item => item.productName === productName && item.variant === variant));
  // }, [cartItems, productName, variant]);

  const handleAddToCart = () => {
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(item => item.productName === productName && item.variant === variant);
    
    if (existingItem) {
      // If it exists, update the quantity
      const updatedCartItems = cartItems.map(item => 
        item.productName === productName && item.variant === variant
          ? { ...item, quantity: item.quantity + quantity } // Increase quantity
          : item
      );
      // Update the cart in Redux and local storage
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
    // Remove all items with the same productName and variant
    const updatedCartItems = cartItems.filter(item => !(item.productName === productName && item.variant === variant));
    dispatch(setCartItems(updatedCartItems));
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setIsInCart(false); // Update local state
  };

  const handleQuantity = (type) => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
        {!isInCart ? ( 
          <button
            onClick={handleAddToCart}
            className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white"
          >
            Add to Cart
          </button>
        ) : ( // If the item IS in the cart
          <button 
            onClick={handleRemoveFromCart} // Pass the function reference
            className="w-36 text-sm rounded-3xl ring-1 ring-lama bg-lama text-white py-2 px-4"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Add;
