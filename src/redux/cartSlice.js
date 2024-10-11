   // src/redux/cartSlice.js
   import { createSlice } from '@reduxjs/toolkit';
  

 const initialState = {
    cartItems: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cartItems')) || [] : [], // Initialize from local storage if in browser
};


   const cartSlice = createSlice({
     name: 'cart',
     initialState,
     reducers: {
       addToCart: (state, action) => {
         const { productName = null, quantity = 1, variant = null, price = 0, imageUrl = null } = action.payload; // Set default values
         const existingItem = state.cartItems.find(item => item.productName === productName && item.variant === variant);
         if (existingItem) {
           // If the item already exists, update the quantity
           existingItem.quantity += quantity;
         } else {
           // Otherwise, add a new item
           state.cartItems.push({ productName, quantity, variant, price, imageUrl });
         }
         // Update local storage after adding to cart
         localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
       },
       removeFromCart: (state, action) => {
         const { productName, variant } = action.payload;
         state.cartItems = state.cartItems.filter(item => item.productName !== productName || item.variant !== variant);
         // Update local storage after removing from cart
         localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
       },
       setCartItems: (state, action) => {
         state.cartItems = action.payload;
         // Update local storage when setting cart items
         localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
       },
     },
   });

   // Export actions
   export const { addToCart, removeFromCart, setCartItems } = cartSlice.actions;

   // Export the reducer
   export default cartSlice.reducer;