import { wixClientServer } from "../lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import CategoriesCarousel from '@/components/CategoriesCarousel'

import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function Categories() {
  const wixClient = await wixClientServer();
  const cats = await wixClient.collections.queryCollections().find();
  
  return <CategoriesCarousel categories={cats.items} />;
}

// Client component for the carousel
