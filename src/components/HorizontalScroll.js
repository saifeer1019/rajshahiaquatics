"use client"

import React, { useRef, useEffect } from 'react';

const useHorizontalScroll = () => {
  const elRef = useRef(null); // Removed TypeScript type
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => { // Removed TypeScript type
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth'
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);
  return elRef;
};

export default function HorizontalScroll({ children }) { // Removed TypeScript type
  const scrollRef = useHorizontalScroll();

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-scroll w-full scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {children}
    </div>
  );
}