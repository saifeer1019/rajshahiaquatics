import dynamic from 'next/dynamic';
const ProductList = dynamic(() => import('@/components/ProductList'), { ssr: false });
import Image from "next/image";
import { Suspense } from "react";
import Slider from "@/components/Slider";
import Categories from "@/components/Catergories";
import Skeleton from "@/components/Skeleton";


export default function Home() {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<Skeleton/>}> {/* Added loading fallback */}
          <ProductList
            categoryId={process.env.Featured_Category}
            limit={4}
            isHomepage={true}
          />
        </Suspense>
      </div>
      <div className="mt-16"> {/* Changed mt-24 to mt-16 to reduce gap */}
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-8"> {/* Changed mb-12 to mb-8 */}
          Categories
        </h1>
        <Suspense fallback={<Skeleton/>}> {/* Added loading fallback */}
          <Categories />
        </Suspense>
      </div>
    </div>
  );
}