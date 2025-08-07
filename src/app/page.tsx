import { BlockRenderer } from "@/Components/blocks/BlockRenderer";
import { HeroSection } from "@/Components/blocks/hero-section";
import { getHomePage } from "@/Data/loaders";
import { PimpinanOpd } from "@/Components/blocks/pimpinanOPD";

async function loader() {
  const data = await getHomePage();
  if (!data) {
    throw new Error("Failed to fetch home page data");
  }
  console.log(data);
  return {...data.data};
}

export default async function HomeRoute() {
 const data = await loader();
 const blocks = data?.blocks || [];
 console.log(data);
 return <BlockRenderer blocks={blocks} />;
}
