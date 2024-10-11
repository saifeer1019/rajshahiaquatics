"use client";


import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {

  const pathname = usePathname();

  const searchParams = useSearchParams();
  const { replace } = useRouter();


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`); // Log the change
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    console.log(`New URL: ${pathname}?${params.toString()}`); // Log the new URL
    replace(`${pathname}?${params.toString()}`);
  };

  const category = ["Guppy", "Molly", "Tetra", "Algae-eater", "Shrimp", "Beta", "Goldfish", "Plants"   ]

  return (
    <div className="mt-12 flex justify-between">

      <div className="flex gap-6 flex-wrap">

      

        <input

          type="text"
          name="min"

          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}

        />

        <input

          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"

          onChange={handleFilterChange}

        />

        {/* TODO: Filter Categories */}

        <select

          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"

          onChange={handleFilterChange}

        >

          <option value="all-products">Category</option>
 
          {category.map((item)=>(
  
            <option value={item}>{item}</option>
 
          ))}
         

        </select>

        
      </div>
      <div className="">
        <select

          name="sort"

          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"

          onChange={handleFilterChange}

        >

          <option>Sort By</option>
          <option value="asc price">Price (low to high)</option>

          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>

          <option value="desc lastUpdated">Oldest</option>

        </select>

      </div>

    </div>
  );

};

export default Filter;
