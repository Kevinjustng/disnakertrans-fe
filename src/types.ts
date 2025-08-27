export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
  children?: NavChildProps[];
}

export interface CtaButtonProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export interface NavChildProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
  ctachild?: CtaButtonProps[];
}

export interface RichTextParagraph {
  type: "paragraph";
  children: Array<{
    type: "text";
    text: string;
  }>;
}

export interface HeadlineItem {
  id: number;
  image?: ImageProps;
}

export interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface ImageProps {
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

export interface LogoProps {
  image: {
    url: string;
    alternativeText?: string;
  };
  image2?: {
    url: string;
    alternativeText?: string;
  };
  logoText?: string;
  logoText2?: string;
  href?: string;
}

export interface HeaderData {
  logo: LogoProps;
  navigation: LinkProps[];
}

export interface GlobalData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  header?: HeaderData;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  heading?: string;
  context?: string;
  publishat?: string;
  featured?: boolean; // ✅ make consistent (boolean)
  image?: ImageProps;
  category?: {
    name: string;
    slug: string;
  } | null;
}

type ComponentType =
  | "blocks.hero-section"
  | "blocks.pimpinan-opd"
  | "blocks.post-list"
  | "blocks.category-list"
  | "blocks.contact";

interface Base<
  T extends ComponentType,
  D extends object = Record<string, unknown>
> {
  id?: number;
  __component?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

export type Block =
  | HeroSectionProps
  | PimpinanProps
  | PostListProps
  | CategoryListProps
  | ContactProps;

export interface HeroSectionProps extends Base<"blocks.hero-section"> {
  image: ImageProps;
  heading: string;
  subheading: string;
  CtaButtons?: CtaButtonProps[];
}

export interface PimpinanProps extends Base<"blocks.pimpinan-opd"> {
  image: ImageProps;
  namalengkap: string;
  pangkat: string;
  jabatan: string;
}

export interface PostListProps extends Base<"blocks.post-list"> {
  posts: Post[]; // ✅ unified, always plural
}

export interface CategoryListProps extends Base<"blocks.category-list"> {
  categories: Category[]; // ✅ unified, always plural
}

export interface ContactProps extends Base<"blocks.contact"> {
  name: string;
  number: string;
  email: string;
  map: string;
}
