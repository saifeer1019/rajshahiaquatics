import dynamic from 'next/dynamic';
const ProductList = dynamic(() => import('@/components/ProductList'), { ssr: false });
import Filter from "../../components/Filter";

import Skeleton from "../../components/Skeleton";
import { wixClientServer } from "../../lib/wixClientServer";
import Image from "next/image";
import { Suspense } from "react";

const ListPage = async ({ searchParams }) => {
  const wixClient = await wixClientServer();
  let cat;

  try {
    cat = await wixClient.collections.getCollectionBySlug(
      searchParams.cat || "all-products"
    );
  } catch (error) {
    console.error("Error fetching collection:", error);
    // Handle the error gracefully
    return (
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative mt-12 text-center">
        <h2 className="text-xl font-semibold">No Products Found</h2>
        <p className="text-gray-500">The collection you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading product details...</div>}>
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 40% off on
            <br /> Aquarium Products
          </h1>
          <button className="rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/fish.jpeg" alt="" fill className="object-contain" />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">{cat?.collection?.name} For You!</h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          categoryId={cat.collection?._id || "00000000-000000-000000-000000000001"}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
    </Suspense>
  );
};

export default ListPage;