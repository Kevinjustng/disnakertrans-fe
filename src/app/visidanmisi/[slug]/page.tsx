import { notFound } from "next/navigation";
import { getPosts } from "@/Data/loaders";
import { StrapiImage } from "@/Components/StrapiImage";
import React from "react";

interface PostPageProps {
  params: { slug: string };
}

interface HeroProps {
  height?: string;
}

function Hero({ height = "h-[40vh] md:h-[50vh]" }: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden ${height} bg-gradient-to-b from-[#0a2540] via-[#163e63] to-[#1e3a5c]`}
    >
      {/* Ripple Effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full bg-blue-900 opacity-20 blur-[100px] animate-pulse" />
        <div className="absolute w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full bg-blue-800 opacity-25 blur-[70px] animate-pulse [animation-delay:0.5s]" />
        <div className="absolute w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] rounded-full bg-blue-700 opacity-30 blur-[40px] animate-pulse [animation-delay:1s]" />
        <div className="absolute w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] rounded-full bg-blue-600 opacity-40 blur-[20px] animate-pulse [animation-delay:1.5s]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Visi Misi
        </h1>
        <p className="text-lg text-blue-100">
          <a
            href="/"
            className="hover:underline hover:text-blue-300 transition-colors"
          >
            Beranda
          </a>{" "}
          / Halaman
        </p>
      </div>
    </section>
  );
}

// ✅ Page Component with Promise params
        export default async function PostPage(props: {
          params: Promise<{ slug: string }>;
        }) {
          // Await the params promise first
          const params = await props.params;
          const slug = params.slug;
          
          const postsData = await getPosts();
          const posts = postsData?.data || [];
          const post = posts.find((p: any) => p.slug === slug);
        
          if (!post) return notFound();
        
          return (
    <div className="bg-white min-h-screen font-sans antialiased">
      {/* Hero */}
      <Hero height="h-[50vh] md:h-[60vh]" />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-16 px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-10">
          {post.author && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {post.author}
            </span>
          )}
        </div>

        {/* Dynamic Content from Strapi - Visi & Misi */}
        {post.context && (
          <section className="mb-16 px-4">
            <article
              className="prose prose-lg lg:prose-xl max-w-4xl mx-auto text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.context }}
            />
          </section>
        )}

        <section className="text-center py-12 bg-white">
          <h2 className="font-light tracking-[0.2143rem] text-[1.875rem] text-gray-600 uppercase mb-2 leading-[1.2]">
            DISNAKERTRANS SULUT
          </h2>
          <h1 className="font-bold tracking-[0.125rem] text-[3rem] text-gray-800 mb-4 leading-[1.2]">
            VISI & MISI PELAYANAN
          </h1>
          <p className="italic font-normal tracking-[0.0625rem] text-[1.125rem] text-gray-600 leading-[1.875rem] mb-4">
            PROVINSI SULAWESI UTARA.
          </p>
          <div className="w-20 h-[1px] bg-gray-400 mx-auto"></div>
        </section>


        {/* Optional: Pelayanan Image (Smaller) */}
        {post.pelayananImage?.url && (
          <section className="my-12 px-4">
            <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-md border border-gray-200">
              <StrapiImage
                src={post.pelayananImage.url}
                alt={post.pelayananImage.alternativeText || "Visi dan Misi Pelayanan"}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </section>
        )}

        {/* Optional: Featured Image (if exists, also small) */}
        {post.image?.url && (
          <section className="my-12 px-4">
            <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-md border border-gray-200">
              <StrapiImage
                src={post.image.url}
                alt={post.image.alternativeText || post.title}
                width={600}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}