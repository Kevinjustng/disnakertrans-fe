import Image, { ImageProps } from "next/image";
import { getStrapiUrl } from "@/utils/getStrapiUrl";

interface StrapiImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt?: string; // optional
  fill?: boolean; // optional fill mode
}

export function StrapiImage({
  src,
  alt,
  className,
  fill = false,
  ...rest
}: Readonly<StrapiImageProps>) {
  const mediaUrl = getStrapiMedia(src);
  if (!mediaUrl) return null;

  // Handle PDFs
  if (mediaUrl.endsWith(".pdf")) {
    return (
      <iframe
        src={mediaUrl}
        title={alt || "PDF document"}
        className={className}
        style={{ width: "100%", height: "500px", border: "none" }}
      />
    );
  }

  // Default: images
  return (
    <Image
      src={mediaUrl}
      alt={alt?.trim() || "Image"}
      className={className}
      {...(fill ? { fill: true, style: { objectFit: "cover" } } : rest)}
    />
  );
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return getStrapiUrl() + url;
}