"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { StrapiImage } from "../StrapiImage";
import { LogoProps, LinkProps, NavChildProps } from "@/types";

interface HeaderProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
  };
}

export function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Mobile submenu states
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null);
  const [openMobileSubDropdown, setOpenMobileSubDropdown] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data) return null;
  const { logo, navigation } = data;

  const handleMouseEnter = (itemId: number) => setOpenDropdown(itemId);
  const handleMouseLeave = () => {
    setOpenDropdown(null);
    setOpenSubDropdown(null);
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
          {/* Logo Section */}
          <Link
            href={logo?.href || "/"}
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            {scrolled ? (
              logo?.image2 && (
                <StrapiImage
                  src={logo.image2.url}
                  alt={logo.image2.alternativeText || "Black Logo"}
                  width={240}
                  height={80}
                  className="h-10 w-auto object-contain"
                  priority
                  sizes="(max-width: 768px) 120px, 240px"
                />
              )
            ) : (
              logo?.image && (
                <StrapiImage
                  src={logo.image.url}
                  alt={logo.image.alternativeText || "White Logo"}
                  width={240}
                  height={80}
                  className="h-10 w-auto object-contain"
                  priority
                  sizes="(max-width: 768px) 120px, 240px"
                />
              )
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

          {/* Desktop Navigation */}
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
                            ? "text-black font-semibold"
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

                {/* 2nd-level dropdown */}
                {item.children && item.children.length > 0 && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-200 origin-top ${
                      openDropdown === item.id
                        ? "opacity-100 visible scale-100"
                        : "opacity-0 invisible scale-95"
                    }`}
                  >
                    <ul className="py-2">
                      {item.children.map((child: NavChildProps) => (
                        <li
                          key={child.id}
                          className="relative group/submenu"
                          onMouseEnter={() =>
                            child.ctachild &&
                            child.ctachild.length > 0 &&
                            setOpenSubDropdown(child.id)
                          }
                          onMouseLeave={() =>
                            child.ctachild &&
                            child.ctachild.length > 0 &&
                            setOpenSubDropdown(null)
                          }
                        >
                          <Link
                            href={child.href}
                            target={child.isExternal ? "_blank" : "_self"}
                            className={`flex items-center justify-between px-3 py-2 text-xs transition-colors duration-150 ${
                              pathname === child.href
                                ? "text-black font-semibold"
                                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                          >
                            <span>{child.text}</span>
                            {child.ctachild && child.ctachild.length > 0 && (
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            )}
                          </Link>

                          {/* 3rd-level submenu (ctachild) */}
                          {child.ctachild && child.ctachild.length > 0 && (
                            <div
                              className={`absolute top-0 left-full w-56 bg-white rounded-md shadow-lg border border-gray-200 transition-all duration-200 origin-top-left 
                                ${
                                  openSubDropdown === child.id
                                    ? "opacity-100 visible translate-x-0"
                                    : "opacity-0 invisible -translate-x-1"
                                }`}
                              style={{ marginLeft: "-1px" }}
                            >
                              <div className="py-2 space-y-1">
                                {child.ctachild.map((cta) => (
                                  <Link
                                    key={cta.id}
                                    href={cta.href}
                                    target={cta.isExternal ? "_blank" : "_self"}
                                    className="block w-full px-3 py-2 text-xs font-medium rounded-md text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                  >
                                    {cta.text}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
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
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <ul className="flex flex-col px-4 py-2 space-y-1">
            {navigation?.map((item) => (
              <li key={item.id}>
                <button
                  className="flex items-center justify-between w-full px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() =>
                    setOpenMobileDropdown(openMobileDropdown === item.id ? null : item.id)
                  }
                >
                  {item.text}
                  {item.children && (
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        openMobileDropdown === item.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  )}
                </button>

                {/* Mobile 2nd level */}
                {item.children && openMobileDropdown === item.id && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {item.children.map((child: NavChildProps) => (
                      <li key={child.id}>
                        <button
                          className="flex items-center justify-between w-full px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                          onClick={() =>
                            setOpenMobileSubDropdown(
                              openMobileSubDropdown === child.id ? null : child.id
                            )
                          }
                        >
                          {child.text}
                          {child.ctachild && (
                            <svg
                              className={`w-3 h-3 transform transition-transform ${
                                openMobileSubDropdown === child.id ? "rotate-90" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                          )}
                        </button>

                        {/* Mobile 3rd level */}
                        {child.ctachild && openMobileSubDropdown === child.id && (
                          <ul className="ml-4 mt-1 space-y-1">
                            {child.ctachild.map((cta) => (
                              <li key={cta.id}>
                                <Link
                                  href={cta.href}
                                  target={cta.isExternal ? "_blank" : "_self"}
                                  className="block px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {cta.text}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
