import { notFound } from "next/navigation";
import { getPosts } from "@/Data/loaders";
import { StrapiImage } from "@/Components/StrapiImage";
import React from "react";

interface LowonganPageProps {
  params: { slug: string };
}

interface HeroProps {
  title: string;
  heading?: string;
  height?: string;
}

function Hero({ title, heading, height = "h-[40vh] md:h-[50vh]" }: HeroProps) {
  return (
    <section className={`relative overflow-hidden ${height} bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600`}>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
          {title}
        </h1>
        {heading && (
          <p className="text-lg md:text-xl text-blue-100">{heading}</p>
        )}
        <p className="text-sm mt-2 text-blue-200">
          <a href="/" className="hover:underline hover:text-white">
            Beranda
          </a>{" "}
          / Lowongan
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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero title={post.title} heading={post.heading} height="h-[50vh] md:h-[60vh]" />

      {/* Content */}
      <main className="max-w-5xl mx-auto py-16 px-6">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm mb-8">
          {post.author && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author}
            </span>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Image */}
        {post.image?.url && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-md border border-gray-200">
            <StrapiImage
              src={post.image.url}
              alt={post.image.alternativeText || post.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Context / Job Description */}
        {post.context && (
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-900 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div dangerouslySetInnerHTML={{ __html: post.context }} />
          </article>
        )}
      </main>
    </div>
  );
}
