import { useSelector } from 'react-redux';
import CustomizeProducts from "../../components/CustomizeProducts"
import ProductImages from "../../components/ProductImages";
import SinglePageClient from "@/components/SinglePageClient";
import { wixClientServer } from "../../lib/wixClientServer";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Skeleton from '@/components/Skeleton';
const SinglePage = async ({ params }) => {
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  const variants = await wixClient.products.queryProductVariants(product._id);

  return (
    <Suspense fallback={<Skeleton />}> {/* Added loading fallback */}
      <SinglePageClient product={product} variants={variants.variants} />
    </Suspense>
  );
};

export default SinglePage;
