import { PimpinanProps } from "@/types";
import { StrapiImage } from "@/Components/StrapiImage";

export function PimpinanOpd({
  image,
  namalengkap,
  pangkat,
  jabatan,
}: Readonly<PimpinanProps>) {
  return (
    <div className="bg-white">
      {/* Title Section */}
      <div className="bg-white">
        {/* White spacer to separate from PostList */}
        <div className="h-35 bg-white"></div>

        <section className="text-center py-12 bg-white px-4">
          <h2 className="font-light tracking-[0.2143rem] text-[1.5rem] sm:text-[1.875rem] text-gray-600 uppercase mb-2 leading-[1.2]">
            DISNAKERTRANS SULUT
          </h2>
          <h1 className="font-bold tracking-[0.125rem] text-[2rem] sm:text-[3rem] text-gray-800 mb-4 leading-[1.2]">
            PROFIL KEPALA DINAS
          </h1>
          <p className="italic font-normal tracking-[0.0625rem] text-base sm:text-[1.125rem] text-gray-600 leading-relaxed mb-4">
            PROVINSI SULAWESI UTARA.
          </p>
          <div className="w-20 h-[1px] bg-gray-400 mx-auto"></div>
        </section>
      </div>

      {/* Profile Section */}
      <div className="bg-gray-50 py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16">
            {/* LEFT SIDE - Text */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              {jabatan && (
                <h2
                  className="text-gray-800 text-2xl sm:text-3xl font-semibold italic border-b-2 border-black inline-block pb-1"
                  style={{ fontFamily: "serif" }}
                >
                  {jabatan}
                </h2>
              )}

              <div className="space-y-4">
                <h1 className="text-gray-900 text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight">
                  {namalengkap}
                </h1>
                <p className="text-gray-600 text-lg sm:text-xl">{pangkat}</p>
              </div>
            </div>

            {/* RIGHT SIDE - Image Container */}
            <div className="flex-shrink-0 w-full sm:w-[420px] h-[400px] sm:h-[520px] relative group rounded-2xl overflow-hidden shadow-lg">
              <StrapiImage
                src={image.url}
                alt={image.alternativeText || `${namalengkap}'s profile picture`}
                width={420}
                height={520}
                className="w-full h-full object-cover transform scale-110 transition-transform duration-700 ease-out group-hover:scale-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
