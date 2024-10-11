import { wixClientServer } from "../lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import HorizontalScroll from "./HorizontalScroll";

export default async function Categories() {
  const wixClient = await wixClientServer();

  const cats = await wixClient.collections.queryCollections().find();
  
  return (
    <HorizontalScroll> {/* Wrap the category items with HorizontalScroll */}
   
        <div className="flex gap-4 md:gap-8 px-4"> {/* Added space-x-2 to control horizontal spacing */}
          {cats.items.map((item) => (
            <Link
              href={`/list?cat=${item.slug}`}
              className="flex-shrink-0 w-[18vw] sm:w-1/2 lg:w-[20vw]xl:w-1/6" // Adjust width classes here
              key={item._id}
            >
              <div className="relative bg-slate-100 w-full h-72 "> {/* Set fixed width and height */}
                <Image
                  src={item.media?.mainMedia?.image?.url || "/category.png"}
                  alt=""
                  fill
                  sizes="[20vw]"
                  className="object-cover"
                />
              </div>
              <h1 className="mt-2 font-light text-xl tracking-wide w-fit"> {/* Keep reduced margin */}
                {item.name}
              </h1>
            </Link>
          ))}
        </div>
    
    </HorizontalScroll>
  );
}