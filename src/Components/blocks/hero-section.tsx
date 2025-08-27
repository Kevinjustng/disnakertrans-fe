import { StrapiImage } from "@/Components/StrapiImage";
import { HeroSectionProps, CtaButtonProps } from "@/types";
import React from "react";

export function HeroSection({
  image,
  heading,
  subheading,
  CtaButtons,
}: Readonly<HeroSectionProps>) {
  const buttons: CtaButtonProps[] = Array.isArray(CtaButtons)
    ? CtaButtons
    : CtaButtons
    ? [CtaButtons]
    : [];

  return (
    <section className="relative w-full min-h-[80vh] md:h-screen text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 animate-heroZoom">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText?.trim() || "Hero background image"}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Text Content */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                   flex flex-col justify-center px-4 sm:px-6 md:px-8 
                   w-full max-w-[90%] sm:max-w-[600px] z-10 text-center md:text-left"
      >
        <h1 className="leading-tight text-white animate-popIn">
          <span className="block font-bold text-sm sm:text-lg md:text-xl uppercase tracking-[0.3em] sm:tracking-[0.5em]">
            {heading.split(" ").slice(0, -1).join(" ")}
          </span>
          <span className="block font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] uppercase">
            {heading.split(" ").slice(-1).join(" ")}
          </span>
        </h1>

        <p className="mt-3 text-base sm:text-lg md:text-xl font-normal text-white animate-popIn [animation-delay:0.3s]">
          {subheading}
        </p>

        {buttons.map((btn, i) => (
          <a
            key={btn.id || i}
            href={btn.href}
            target={btn.isExternal ? "_blank" : "_self"}
            rel={btn.isExternal ? "noopener noreferrer" : undefined}
            className="mt-6 inline-block w-full sm:w-60 px-4 py-3 text-base sm:text-lg 
                       font-semibold text-white bg-blue-600 rounded-lg 
                       hover:bg-cyan-600 hover:scale-105 transition-all duration-200 
                       text-center animate-popIn [animation-delay:0.6s]"
          >
            {btn.text}
          </a>
        ))}
      </div>
    </section>
  );
}
