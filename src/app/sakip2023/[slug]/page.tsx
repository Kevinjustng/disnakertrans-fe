import { notFound } from "next/navigation";
import { getPosts } from "@/Data/loaders";
import { StrapiImage } from "@/Components/StrapiImage";
import React from "react";
// Import the correct getStrapiMedia function from the same file as StrapiImage
import { getStrapiMedia } from "@/Components/StrapiImage";

interface PostPageProps {
  params: { slug: string };
}

interface HeroProps {
  height?: string;
}

// PDF Component
interface StrapiFileProps {
  src: string;
  name?: string;
  className?: string;
}

function StrapiFile({ src, name, className }: StrapiFileProps) {
  if (!src) return null;

  const mediaUrl = getStrapiMedia(src) || "";

  return (
    <div className={className}>
      <iframe
        src={mediaUrl}
        width="100%"
        height="80vh"
        className="border-0"
        title={name || "PDF Document"}
      />
      <p className="text-center text-sm text-gray-500 p-2 bg-gray-50">
        Jika PDF tidak tampil,{" "}
        <a
          href={mediaUrl}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          klik di sini untuk membuka di tab baru
        </a>
      </p>
    </div>
  );
}

// Component to safely render HTML/links inside context
function RichTextContent({ content }: { content: string }) {
  const processHtmlContent = (html: string) => {
    // Convert plain URLs into anchor tags
    const withLinks = html.replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
    );

    // Ensure existing <a> tags open in new tab
    const processedHtml = withLinks.replace(
      /<a\s+(?!.*\btarget\b)[^>]*href=["']([^"']*)["'][^>]*>/gi,
      '<a href="$1" target="_blank" rel="noopener noreferrer">'
    );

    return { __html: processedHtml };
  };

  return (
    <article className="prose lg:prose-xl max-w-none text-gray-900">
      <div dangerouslySetInnerHTML={processHtmlContent(content)} />
    </article>
  );
}

function Hero({ height = "h-[40vh] md:h-[50vh]" }: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden ${height} bg-gradient-to-b from-[#0a2540] via-[#163e63] to-[#1e3a5c]`}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full bg-blue-900 opacity-20 blur-[100px] animate-pulse" />
        <div className="absolute w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full bg-blue-800 opacity-25 blur-[70px] animate-pulse [animation-delay:0.5s]" />
        <div className="absolute w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] rounded-full bg-blue-700 opacity-30 blur-[40px] animate-pulse [animation-delay:1s]" />
        <div className="absolute w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] rounded-full bg-blue-600 opacity-40 blur-[20px] animate-pulse [animation-delay:1.5s]" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Sakip 2023
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

// ✅ Remove the PostPageProps interface and use inline type definition
export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await the params promise first
  const params = await props.params;
  const slug = params.slug;
  
  const postsData = await getPosts();
  const posts = postsData?.data || [];
  const post = posts.find((p: any) => p.slug === slug);

  if (!post) return notFound();

  const pdfs = post.pdfs || (post.pdf ? [post.pdf] : []);

  return (
    <div className="bg-white min-h-screen">
      <Hero height="h-[50vh] md:h-[60vh]" />

      <main className="max-w-4xl mx-auto py-16 px-6 bg-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-900">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-700 text-sm mb-8">
          {post.author && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
          {post.publishedAt && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {post.image?.url && (
          <div className="mb-12 rounded-lg overflow-hidden border border-gray-200">
            <StrapiImage
              src={post.image.url}
              alt={post.image.alternativeText || post.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Render all PDFs from dedicated PDF fields */}
        {pdfs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dokumen PDF</h2>
            {pdfs.map((pdf: any, index: number) => (
              <StrapiFile
                key={index}
                src={pdf.url}
                name={pdf.name || `Dokumen ${index + 1}`}
                className="mb-8 border rounded-lg overflow-hidden"
              />
            ))}
          </div>
        )}

        {/* Show HTML content with links */}
        {post.context && <RichTextContent content={post.context} />}
      </main>
    </div>
  );
}
