'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoriesCarousel({ categories }) {
    const carouselRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    
    const scroll = (direction) => {
      if (carouselRef.current) {
        const scrollAmount = direction === 'left' ? -300 : 300;
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
        
        // Update scroll position after scrolling
        setTimeout(() => {
          if (carouselRef.current) {
            setScrollPosition(carouselRef.current.scrollLeft);
          }
        }, 500);
      }
    };
  
    const showLeftArrow = scrollPosition > 0;
    const showRightArrow = carouselRef.current ? 
      scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10 : 
      true;
  
    return (
      <div className="relative w-full">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {/* Categories Container */}
        <div 
          ref={carouselRef}
          className="flex gap-4 md:gap-8 px-4 overflow-x-auto scrollbar-hide scroll-smooth"
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((item) => (
            <Link
              href={`/list?cat=${item.slug}`}
              className="flex-shrink-0 w-[18vw] sm:w-1/2 lg:w-[20vw] xl:w-1/6"
              key={item._id}
            >
              <div className="relative bg-slate-100 w-full h-72">
                <Image
                  src={item.media?.mainMedia?.image?.url || "/category.png"}
                  alt=""
                  fill
                  sizes="[20vw]"
                  className="object-cover"
                />
              </div>
              <h1 className="mt-2 font-light text-xl tracking-wide w-fit">
                {item.name}
              </h1>
            </Link>
          ))}
        </div>
        
        {/* Right Arrow */}
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}
        
        {/* CSS for hiding scrollbar */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    );
  }
