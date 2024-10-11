"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
const [subscribed, setSubscribed] = useState(false);
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">Rajshahi Aquatics</div>
          </Link>
          <p>
            House 285, Road 2, Padma R/A, Rajshahi-6205
          </p>
          <span className="font-semibold">aquarajshahi@gmail.com</span>
          <span className="font-semibold">01755201753</span>
          <div className="flex gap-6">
            <Image src="/facebook.png" alt="" width={16} height={16} />
            <Image src="/instagram.png" alt="" width={16} height={16} />
            <Image src="/youtube.png" alt="" width={16} height={16} />
            <Image src="/pinterest.png" alt="" width={16} height={16} />
            <Image src="/x.png" alt="" width={16} height={16} />
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-start">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col justify-start mt-16">
              <Link href="/About" className="mb-4">About Us</Link>
         
              <Link href="/Contact" className="mb-4">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href="/list?cat=Guppy">Guppy</Link>
              <Link href="/list?cat=Molly">Molly</Link>
              <Link href="/list?cat=Tetra">Tetra</Link>
              <Link href="/list?cat=Algae-eater">Algae-eater</Link>
         
              <Link href="/list">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href="/Contact">Customer Service</Link>
              <Link href="">My Account (Coming soon)</Link>
              <Link href="">Find a Store (Coming soon)</Link>
              <Link href="">Legal & Privacy (Coming soon)</Link>
              <Link href="">Gift Card (Coming soon)</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
          <div className="flex">
        {subscribed ? <span>Subscribed</span> : <><input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4"
              />
              <button className="w-1/4 bg-lama text-white" onClick={()=>setSubscribed(true)}>JOIN</button>
              </> 
            }
        
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between">
           <h1>We are going to accept online payments soon</h1>
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">© 2023 Rajshahi Aquatics</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">Bangladesh | English</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">BDT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
