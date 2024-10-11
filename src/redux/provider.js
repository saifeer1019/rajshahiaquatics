// src/redux/provider.js
"use client"; // Ensure this is a Client Component
import { Provider } from 'react-redux';
import store from './store';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}