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
      {/* Water-like Ripple Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full bg-blue-900 opacity-20 blur-[100px] animate-pulse" />
        <div className="absolute w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full bg-blue-800 opacity-25 blur-[70px] animate-pulse [animation-delay:0.5s]" />
        <div className="absolute w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] rounded-full bg-blue-700 opacity-30 blur-[40px] animate-pulse [animation-delay:1s]" />
        <div className="absolute w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] rounded-full bg-blue-600 opacity-40 blur-[20px] animate-pulse [animation-delay:1.5s]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Kepala Dinas
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
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <Hero height="h-[50vh] md:h-[60vh]" />

      <main className="max-w-5xl mx-auto py-16 px-6 bg-white">
        {/* Profile Card */}
        <section className="p-8 rounded-xl shadow-lg border border-gray-200 bg-white transition-transform transform hover:scale-[1.02] hover:shadow-2xl duration-300 relative">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Date on Top Right */}
            {post.publishedAt && (
              <span className="absolute top-4 right-6 text-sm text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
            )}

            {/* Profile Image */}
            {post.image?.url && (
              <div className="flex-shrink-0">
                <StrapiImage
                  src={post.image.url}
                  alt={post.image.alternativeText || post.title}
                  width={300} // adjust width
                  height={350} // adjust height
                  className="rounded-lg object-cover w-[250px] h-[300px] md:w-[300px] md:h-[350px] transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}

            {/* Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Profil Kepala Dinas
              </h2>
              <dl className="divide-y divide-gray-200">
                {post.context.split("\n").map((line: string, idx: number) => {
                  if (!line.includes(":")) return null;
                  const [key, value] = line.split(":").map((s) => s.trim());
                  return (
                    <div
                      key={idx}
                      className="py-3 sm:grid sm:grid-cols-3 sm:gap-4"
                    >
                      <dt className="text-sm font-medium text-gray-700">
                        {key}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                        {value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
