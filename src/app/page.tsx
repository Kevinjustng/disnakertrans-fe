import { BlockRenderer } from "@/Components/blocks/BlockRenderer";
import { getHomePage, getPosts } from "@/Data/loaders"; 
import { PostList } from "@/Components/blocks/post-list";
import type { Block, Post } from "@/types";
import Infografis from "@/Components/blocks/infografis"; // import your Infografis component

async function loader() {
  const data = await getHomePage();
  if (!data) throw new Error("Failed to fetch home page data");
  return { ...data.data };
}

async function Postloader() {
  const data = await getPosts();
  if (!data) throw new Error("Failed to fetch posts");
  return data.data;
}

export default async function HomeRoute() {
  const data = await loader();
  const post = await Postloader();

  const blocks = Array.isArray(data?.blocks) ? data.blocks : [];

  const allowedSlugs = ["post"];
  const categorizedPosts = post.filter(
    (p: Post) => p.category && allowedSlugs.includes(p.category.slug)
  );

  const heroIdx = blocks.findIndex(
    (b: Block) => b.__component === "blocks.hero-section"
  );
  const pimpinanIdx = blocks.findIndex(
    (b: Block) => b.__component === "blocks.pimpinan-opd"
  );
 
  return (
    <>
      {/* Render blocks before hero-section */}
      {blocks.slice(0, heroIdx + 1).map((block: Block, i: number) => (
        <BlockRenderer key={i} blocks={[block]} />
      ))}

      {/* Headline Section */}
      <section className="bg-white text-center py-12 md:py-16 px-4">
        <h2 className="font-light tracking-widest text-xl md:text-2xl text-gray-600 uppercase mb-2">
          DISNAKERTRANS SULUT
        </h2>
        <h1 className="font-bold tracking-wide text-3xl md:text-5xl text-[#55565b] mb-4 leading-tight">
          HEADLINE
        </h1>
        <p className="italic font-normal tracking-wide text-base md:text-lg text-[#55565b] leading-relaxed mb-4">
          PROVINSI SULAWESI UTARA.
        </p>
        <div className="w-16 md:w-20 h-[1px] bg-gray-400 mx-auto"></div>
      </section>

      {/* Render PostList right after hero-section */}
      <section className="px-4 md:px-8 lg:px-16">
        {categorizedPosts.length > 0 ? (
          <PostList posts={categorizedPosts} />
        ) : (
          <div className="text-center text-gray-500">No posts found.</div>
        )}
      </section>

      {/* Render blocks before Pimpinan OPD (after hero) */}
      {blocks.slice(heroIdx + 1, pimpinanIdx).map((block: Block, i: number) => (
        <BlockRenderer key={i + heroIdx + 1} blocks={[block]} />
      ))}

      {/* Render Pimpinan OPD */}
      {pimpinanIdx !== -1 && (
        <BlockRenderer key={pimpinanIdx} blocks={[blocks[pimpinanIdx]]} />
      )}

      {/* Render Infografis immediately after Pimpinan OPD */}
      {pimpinanIdx !== -1 && (
        <section className="my-12 md:my-16 px-4 md:px-6 lg:px-8">
          <Infografis
            posts={post.filter((p: Post) => p.category?.slug === "infografis")}
          />
        </section>
      )}

      {/* Render remaining blocks after Pimpinan OPD */}
      {blocks.slice(pimpinanIdx + 1).map((block: Block, i: number) => (
        <BlockRenderer key={i + pimpinanIdx + 1} blocks={[block]} />
      ))}
    </>
  );
} //test


 