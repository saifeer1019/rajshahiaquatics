"use server";

import Order from "@/models/Order";


import { connectToDB } from "../mongoose";


export async function createOrder({ orderData }) {
  try {
    connectToDB();
    console.log(orderData)
console.log("ghjkj")
  
    const createdThread = await Order.create(orderData );
    console.log('Created!!')
return("Created!")
    
    revalidatePath(path);
  } catch (error) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}