import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/Components/layout/Header";
import { Footer } from "@/Components/layout/Footer";
import { getGlobalSettings } from "@/Data/loaders";

export const metadata: Metadata = {
  title: "Disnakertrans Provinsi Sulawesi Utara - dinaskertrans",
  description: "Dinas Tenaga Kerja mempunyai tugas menyelenggarakan urusan pemerintahan di bidang Tenaga Kerja mempunyai fungsi: perumusan kebijakan daerah di bidang Tenaga Kerja.",
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
    console.log("Global Data:", globalData);

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
    <html lang="id" className="h-full overflow-x-hidden">
      <body className="bg-white text-black flex flex-col min-h-full m-0 p-0 overflow-x-hidden">
        {/* Header */}
        {headerData ? (
          <Header data={headerData} />
        ) : (
          <div className="bg-gray-100 p-4 text-center">Loading header...</div>
        )}

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        {footerData ? (
          <Footer data={footerData} />
        ) : (
          <div className="bg-gray-100 p-4 text-center">Loading footer...</div>
        )}
      </body>
    </html>
  );
}
