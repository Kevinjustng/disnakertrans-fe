"use client";
import Link from "next/link";
import { StrapiImage } from "../StrapiImage";
import { LogoProps, LinkProps } from "@/types";

interface FooterProps {
  data: {
    logo?: LogoProps;
    navigation?: LinkProps[];
  };
}

export function Footer({ data }: FooterProps) {
  if (!data) return null;

  const { logo, navigation } = data;

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN - Logo & Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {logo?.image && (
                <StrapiImage
                  src={logo.image.url}
                  alt={logo.image.alternativeText || "Logo"}
                  className="h-12 w-12 object-contain"
                  width={48}
                  height={48}
                />
              )}
              <div>
                <h3 className="text-lg font-bold">DISNAKERTRANS</h3>
                <p className="text-sm text-gray-300">DINAS TENAGA KERJA</p>
                <p className="text-xs text-gray-400">
                  PROVINSI SULAWESI UTARA
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                📍 FRCV+C6J, Jl. 17 Agustus, Teling Atas, Kec. Wanea, Kota
                Manado, Sulawesi Utara 95119
              </p>
              <p>📞 (0431) 852833</p>
              <p>✉️ info@dinaspmd.go.id</p>
            </div>
          </div>

          {/* RIGHT COLUMN - Social Media & Additional Links */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <div>
              <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
              <div className="flex space-x-4 mb-6">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/p/Disnakertrans-Sulut-100017804653680/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 
                      1.326v21.348C0 23.403.597 24 1.326 
                      24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 
                      1.894-4.788 4.659-4.788 1.325 0 2.464.099 
                      2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 
                      1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.403 
                      24 24 23.403 24 22.674V1.326C24 .597 
                      23.403 0 22.675 0z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/disnakertrans_sulut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 
                      4.85.07 1.366.062 2.633.35 
                      3.608 1.325.975.975 1.263 
                      2.242 1.325 3.608.058 1.266.07 
                      1.646.07 4.85s-.012 3.584-.07 
                      4.85c-.062 1.366-.35 2.633-1.325 
                      3.608-.975.975-2.242 1.263-3.608 
                      1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 
                      15.747 2.163 15.367 2.163 
                      12s.012-3.584.07-4.85c.062-1.366.35-2.633 
                      1.325-3.608C4.533 2.583 5.8 2.295 
                      7.166 2.233 8.432 2.175 8.812 
                      2.163 12 2.163zM12 6.054a5.946 
                      5.946 0 1 1 0 11.892 5.946 
                      5.946 0 0 1 0-11.892zm0 
                      9.799a3.853 3.853 0 1 0 0-7.706 
                      3.853 3.853 0 0 0 0 7.706zm6.406-10.845a1.44 
                      1.44 0 1 1-2.88 0 1.44 
                      1.44 0 0 1 2.88 0z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Additional Links */}
            <div className="text-sm text-gray-300 space-y-2 md:text-right">
              <Link href="/privacy" className="block hover:text-white">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="block hover:text-white">
                Syarat & Ketentuan
              </Link>
              <Link href="/sitemap" className="block hover:text-white">
                Peta Situs
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Dinas Tenaga Kerja Daerah Provinsi
            Sulawesi Utara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
