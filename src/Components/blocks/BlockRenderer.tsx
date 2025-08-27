import type { Block } from "@/types";
import { HeroSection } from "@/Components/blocks/hero-section";
import { PostList } from "@/Components/blocks/post-list";
import { PimpinanOpd } from "@/Components/blocks/pimpinanOPD";
import { Contact } from "@/Components/blocks/contact";



export function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} key={index} />;
    case "blocks.post-list":
      return <PostList {...block} key={index} />;
    case "blocks.pimpinan-opd":
      return <PimpinanOpd {...block} key={index} />;
      case "blocks.contact":
  return <Contact {...block} key={index} />;
    default:
      return null;
  }
}


export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}