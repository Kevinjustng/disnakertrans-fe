import { StrapiImage } from "@/Components/StrapiImage";
import { HeroSectionProps } from "@/types";

export function HeroSection({
  image,
  heading,
  subheading,
}: Readonly<HeroSectionProps>) {
  return (
    <section className="relative w-full h-screen text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText?.trim() || "Hero background image"}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* REAL Black Overlay with RGBA */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} // Adjust 0.4 to 0.6, 0.7, etc. if you want darker
        ></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-mono mb-6 tracking-wide">
            {heading}
          </h1>
          <h2 className="text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mx-auto">
            {subheading}
          </h2>
        </div>
      </div>
    </section>
  );
}
