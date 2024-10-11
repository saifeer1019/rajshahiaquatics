// src/lib/wixContext.js
"use client";
import React, { createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { products } from '@wix/stores';

import { redirects } from '@wix/redirects';



    

export const myWixClient = createClient({
    modules: { products,  redirects },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID, // Replace with your actual client ID
      tokens: JSON.parse(Cookies.get('session') || '{"accessToken": {}, "refreshToken": {}}'),
    }),
  });



export const WixContext  = createContext(myWixClient)

export const WixClientContextProvider = ({children})=>{

  return (
    <WixContext.Provider value={myWixClient}>
    {children}
    </WixContext.Provider>
  )
}