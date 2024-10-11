import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";

import { cookies } from "next/headers";


export const wixClientServer = async () => {
const cookiestore = cookies()

  const wixClient = createClient({
    modules: {
      products,
      collections,


    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
   tokens: JSON.parse(cookiestore.get('session') || '{"accessToken": {}, "refreshToken": {}}'),
    }),
  });

  return wixClient;
};
