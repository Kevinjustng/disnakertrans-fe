import { getPageBySlug } from "@/Data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/Components/blocks/BlockRenderer";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  params: Promise<{ slug: string }>; // params is now a Promise
}

export default async function DynamicPageRoute(props: PageProps) {
  // Await the params promise
  const params = await props.params;
  const slug = params.slug;
  
  const { blocks } = await loader(slug);
  return <BlockRenderer blocks={blocks} />;
}