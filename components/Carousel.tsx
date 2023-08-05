"use client";

import React, { useState } from 'react';
import { Billboard as BillboardType } from "@/types"
import { cn } from '@/lib/utils';
import { Billboard } from './billboard';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface CarouselProps {
  data: BillboardType[];
}


const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full">
        <Billboard data={data[currentIndex]} />
      
      <div className="absolute inset-y-0 left-5 md:left-20 flex items-center">
        <button
          className="p-2 bg-transparent rounded-full border text-white "
          onClick={handlePrev}
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-5 md:right-20 flex items-center">
        <button
         className="p-2 bg-transparent rounded-full border text-white "
          onClick={handleNext}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex items-center justify-center absolute bottom-5 inset-x-0">
        {data.map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-3 h-3 mx-1 rounded-full cursor-pointer',
              {
                'bg-gray-800': index === currentIndex,
                'bg-gray-300': index !== currentIndex,
              }
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Carousel;
