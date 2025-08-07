"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { StrapiImage } from "../StrapiImage";
import { LogoProps, LinkProps } from "@/types";

interface HeaderProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
  };
}

export function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data) return null;
  const { logo, navigation } = data;

  const handleMouseEnter = (itemId: number) => {
    setOpenDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md border-gray-200"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section - Far Left */}
          <Link
            href={logo?.href || "/"}
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            {logo?.image && (
              <StrapiImage
                src={logo.image.url}
                alt={logo.image.alternativeText || "No alternative text provided"}
                className="h-10 w-auto object-contain" // Reduced height for compactness
                width={120}
                height={40}
              />
            )}
            {logo?.logoText2 && (
              <span
                className={`text-sm font-bold transition-colors ml-2 ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                {logo.logoText2}
              </span>
            )}
          </Link>

          {/* Navigation Section - Far Right */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation?.map((item) => (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() => item.children && handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    target={item.isExternal ? "_blank" : "_self"}
                    className={`px-3 py-1.5 rounded-md font-medium text-xs uppercase tracking-wide transition-all duration-200 flex items-center gap-1
                      ${
                        pathname === item.href
                          ? scrolled
                            ? "text-blue-600"
                            : "text-white underline"
                          : scrolled
                            ? "text-gray-700 hover:text-blue-600"
                            : "text-white hover:text-blue-400"
                      }
                    `}
                  >
                    {item.text}
                    {item.children && item.children.length > 0 && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          openDropdown === item.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>
                </div>

                {item.children && item.children.length > 0 && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-200 origin-top ${
                      openDropdown === item.id
                        ? "opacity-100 visible scale-100"
                        : "opacity-0 invisible scale-95"
                    }`}
                  >
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          target={child.isExternal ? "_blank" : "_self"}
                          className={`block px-3 py-1.5 text-xs transition-colors duration-150 ${
                            pathname === child.href
                              ? "text-blue-600 font-semibold"
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{child.text}</span>
                            {child.isExternal && (
                              <svg
                                className="w-2.5 h-2.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1.5 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-md"
            aria-label="Toggle mobile menu"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}