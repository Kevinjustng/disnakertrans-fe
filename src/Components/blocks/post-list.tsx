import React from "react";
import type { Post } from "@/types";
import { StrapiImage } from "@/Components/StrapiImage";
import Link from "next/link";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-500 text-center py-12">No posts available.</p>;
  }

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {posts.map((post) => (
            <article
              key={post.id}
              className="relative flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Date Badge */}
              {post.publishat && (
                <div className="absolute top-0 right-0 z-10 bg-black text-white px-2 py-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-end rounded-bl-lg w-14 md:w-16">
                  {(() => {
                    const date = new Date(post.publishat);
                    const day = date.getDate().toString().padStart(2, "0");
                    const month = date.toLocaleString("default", { month: "short" });
                    const year = date.getFullYear();
                    return (
                      <>
                        <span className="text-xs md:text-sm font-medium">{day}</span>
                        <span className="text-xs md:text-sm uppercase">{month}</span>
                        <span className="text-xs md:text-sm">{year}</span>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Image */}
              {post.image?.url && (
                <div className="w-full overflow-hidden aspect-[4/3] md:aspect-[3/2]">
                  <StrapiImage
                    src={post.image.url}
                    alt={post.image.alternativeText || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={580}
                    height={500}
                    
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col">
                {/* Heading */}
                <h2 className="text-lg md:text-xl font-medium mb-4 text-gray-500 line-clamp-2">
                  {post.heading}
                </h2>

                {/* Read More Link */}
                <div className="mt-auto">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-block text-gray-600 hover:text-gray-800 text-sm md:text-base transition-colors duration-300 group"
                  >
                    Read More →
                    <span className="block h-[1px] bg-gray-600 w-0 group-hover:w-16 transition-all duration-300 mt-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}