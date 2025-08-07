export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
  children?: CtaButtonProps[];
}

export interface CtaButtonProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

export interface LogoProps {
  image: {
    url: string;
    alternativeText?: string;
  };
  logoText?: string;
  logoText2?: string;
  href?: string; // ✅ This allows logo.href in your component
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

type ComponentType = "blocks.hero-section" | "blocks.pimpinan-opd";

interface Base<
  T extends ComponentType,
  D extends object = Record<string, unknown>
> {
  id: number;
  __component?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

export type Block = HeroSectionProps | PimpinanProps;

export interface HeroSectionProps extends Base<"blocks.hero-section"> {
    image: ImageProps;
    heading: string;
    subheading: string;
}
export interface PimpinanProps extends Base<"blocks.pimpinan-opd"> {
    image: ImageProps;
    namalengkap: string;
    pangkat: string;
    jabatan: string;
}