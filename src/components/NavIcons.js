"use client";


import Image from "next/image";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setCartItems } from '../redux/cartSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { useWixClient } from "../hooks/useWixClient";

import Cookies from "js-cookie";
import Cart from "./Cart";
import { useUser } from '@auth0/nextjs-auth0/client';
import Notification from "./Notifications";



const NavIcons = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);


  const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.cartItems);

// Save cartItems to local storage whenever it changes
useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);


  const router = useRouter();
  const pathName = usePathname();

  const wixClient = useWixClient();

  const { user, error } = useUser(); // Use user to check login status

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  const handleLogout = async () => {

    setIsLoading(true);

    Cookies.remove("refreshToken");

    const { logoutUrl } = await wixClient.auth.logout(window.location.href);

    setIsLoading(false);

    setIsDropdownOpen(false); // Close dropdown on logout

    router.push(logoutUrl);

  };


  return (

    <div className="flex items-center gap-4 xl:gap-6 relative" >
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        onClick={() => setIsNotificationOpen((prev) => !prev)}

        className="cursor-pointer"

      />
      {isNotificationOpen && user && 
        <Notification>
          <h1>No new notifications</h1>
        </Notification>
      }
      {isNotificationOpen && !user && 
        <Notification>
          <h1>Please login to view notifications</h1>
        </Notification>
      }

      <div

        className="relative cursor-pointer"

        onClick={() => setIsCartOpen((prev) => !prev)}

      >

        <Image src="/cart.png" alt="" width={22} height={22} />
        {cartItems.length > 0 && (
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {cartItems.length}   
        </div>
        )}

      </div>
      {isCartOpen && <Cart />}


     

        {user ? (

          <>
            <h1 className="cursor-pointer flex items-center" onClick={() => {setIsDropdownOpen((prev) => !prev)
              console.log(isDropdownOpen)
            }
            }>
              {user.name}

              {/* Down arrow icon */}

            </h1>

            {isDropdownOpen && ( // Show dropdown if isDropdownOpen is true

              <a href="/api/auth/logout" className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20 hover:bg-gray-100">
              Logout
              </a>

            )}
          </>

        ) : (

          <a href="/api/auth/login" className="cursor-pointer flex items-center">

            Log in
          </a>

        )}

      </div>

 
  );
};


export default NavIcons;
