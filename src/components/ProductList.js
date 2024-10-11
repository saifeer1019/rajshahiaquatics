import { wixClientServer } from "../lib/wixClientServer";
import { products } from "@wix/stores";

import Image from "next/image";

import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
import AddToCart from "./AddToCart";
import Star from '@mui/icons-material/Star'; // Import filled star icon
import StarBorder from '@mui/icons-material/StarBorder'; // Import unfilled star icon

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,

  isHomepage

}) => {
  const wixClient = await wixClientServer();


  let productQuery = wixClient.products

    .queryProducts()

    .startsWith("name", searchParams?.name || "")

    .eq("collectionIds", categoryId)

    .gt("priceData.price", searchParams?.min || 0)

    .lt("priceData.price", searchParams?.max || 999999)

    .limit(limit || PRODUCT_PER_PAGE)

    .skip(

      searchParams?.page

        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)

        : 0
    );

  if (searchParams?.sort) {

    const [sortType, sortBy] = searchParams.sort.split(" ");


    if (sortType === "asc+price") {

      productQuery = productQuery.ascending("price");

    }
    if (sortType === "desc+price") {
      productQuery = productQuery.descending("price");

    }
    if (sortType === "asc+lastUpdated") {

      productQuery = productQuery.ascending("_createdDate");

    }
    if (sortType === "desc+lastUpdated") {
      productQuery = productQuery.descending("_createdDate");

    }

  }


  const res = await productQuery.find();

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 flex-start flex-wrap">

      {res.items.map((product) => (
        <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        key={product._id}> 
        <Link

          href={"/" + product.slug}

        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill

              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />

            {product.media?.items && (

              <Image
                src={product.media?.items[1]?.image?.url || "/product.png"}

                alt=""

                fill

                sizes="25vw"

                className="absolute object-cover rounded-md"

              />

            )}

          </div>
          <div className="flex justify-between mt-2">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">Tk. {product.price?.price}</span>
          </div>

          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{

                __html: DOMPurify.sanitize(

                  product.additionalInfoSections.find(

                    (section) => section.title === "shortDesc"

                  )?.description || ""

                ),
              }}
            ></div>

          )}
          <div className="flex items-center mt-1">

            {Array.from({ length: 5 }, (_, index) => (

              index < (product.rating || 4) ? (
                <Star key={index} sx={{ color: '#f69f29' }} /> // Set filled star color to #f69f29
              ) : (
                <StarBorder key={index} sx={{ color: '#f69f29' }} /> // Set unfilled star color to #f69f29

              )
            ))}

          </div>
        </Link>
        <AddToCart 
        productName={product.name}

        price={product.price?.price}
        image={product.media?.mainMedia?.image?.url || "/product.png"} />

        </div>
      ))}
     {!isHomepage && (

        <Pagination
          currentPage={res.currentPage || 0}

          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />

      )}

    </div>
  );
};

export default ProductList;
