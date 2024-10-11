   // src/redux/store.js
   import { configureStore } from '@reduxjs/toolkit';
   import cartReducer from './cartSlice'; 
   import variantReducer from './variantSlice'; // Adjust the path as necessary


   const store = configureStore({
     reducer: {
       cart: cartReducer,
       variant: variantReducer
     },
   });

   export default store;