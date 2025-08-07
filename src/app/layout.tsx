import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/Components/layout/Header";
import { getGlobalSettings } from "@/Data/loaders";
import { Footer } from "@/Components/layout/Footer";

export const metadata: Metadata = {
  title: "DinasPMD - Dinas Pemberdayaan Masyarakat dan Desa",
  description: "Website Resmi Dinas Pemberdayaan Masyarakat dan Desa",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let headerData = null;
  let footerData = null;

  try {
    const globalData = await getGlobalSettings();
    console.log ("Global Data:", globalData);

    if (globalData?.data?.header) {
      headerData = globalData.data.header;
    }

    if (globalData?.data?.footer) {
      footerData = globalData.data.footer;
    }
  } catch (error) {
    console.error("Failed to fetch global settings:", error);
  }

  return (
    <html lang="id">
      <body>
        {headerData ? (
          <Header data={headerData} />
        ) : (
          <div className="bg-gray-100 p-4 text-center">Loading header...</div>
        )}
        <main>{children}</main>

        {footerData ? (
          <Footer data={footerData} />
        ) : (
          <div className="bg-gray-100 p-4 text-center">Loading footer...</div>
        )}
      </body>
    </html>
  );
}