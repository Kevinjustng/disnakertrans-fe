"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { Post } from "@/types";
import { StrapiImage } from "@/Components/StrapiImage";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

interface InfografisProps {
  posts: Post[];
}

const Infografis: React.FC<InfografisProps> = ({ posts }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: false,
  align: "center",
  dragFree: true,
  skipSnaps: false,
});


  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Card dimensions
  const cardWidthPx = 360;
  const imageHeightPx = 480; // taller for infografis

  return (
    <section className="bg-gray-50 py-16">
      {/* Title */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <h2 className="text-lg font-light text-gray-600 uppercase tracking-wider mb-2">
          DISNAKERTRANS SULUT
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
          INFOGRAFIS
        </h1>
        <p className="text-sm md:text-base italic text-gray-600 mb-6">
          PROVINSI SULAWESI UTARA.
        </p>
        <div className="w-16 h-[1px] bg-gray-300 mx-auto"></div>
      </div>

      {/* Carousel */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex items-center gap-6">
            {posts.map((post, index) => {
              const isActive = index === selectedIndex;

              return (
                <Link
  key={post.id}
  href={`/posts/${post.slug}`}
  className={`embla__slide flex-shrink-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden
    transition-transform duration-300 cursor-pointer
    ${index === selectedIndex ? "scale-105 z-10 opacity-100" : "scale-95 opacity-75"}
    hover:scale-105 hover:z-20 hover:opacity-100`} // <-- full opacity on hover
  style={{ width: `${cardWidthPx}px` }}
>


                  {/* Image */}
                  {post.image?.url && (
                    <div
                      className="w-full overflow-hidden"
                      style={{ height: `${imageHeightPx}px` }}
                    >
                      <StrapiImage
                        src={post.image.url}
                        alt={post.image.alternativeText || post.title}
                        className="w-full h-full object-contain" // full image visible
                        width={cardWidthPx}
                        height={imageHeightPx}
                      />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100 transition-colors z-20"
        >
          ◀
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100 transition-colors z-20"
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default Infografis;
