import { PimpinanProps } from "@/types";
import { StrapiImage } from "@/Components/StrapiImage";

export function PimpinanOpd({
  image,
  namalengkap,
  pangkat,
  jabatan,
}: Readonly<PimpinanProps>) {
  return (
    <div className="bg-gray-50 py-24 px-8"> {/* Increased padding */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-16"> {/* More gap */}
          {/* LEFT SIDE - Text */}
          <div className="flex-1 space-y-6"> {/* Reduced vertical spacing */}
            {jabatan && (
              <h2 className="text-gray-800 text-3xl font-semibold italic border-b-2 border-black inline-block pb-1" style={{ fontFamily: 'serif' }}>

                {jabatan}
              </h2>
            )}

            <div className="space-y-4">
              <h1 className="text-gray-900 text-4xl xl:text-5xl font-bold leading-tight">
                {namalengkap}
              </h1>
              <p className="text-gray-600 text-xl">
                {pangkat}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - Image Container */}
          <div className="flex-shrink-0 w-[420px] h-[520px] relative group"> {/* Slightly smaller but still prominent */}
            {/* Glass frame */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl"></div>
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute -inset-8 bg-gradient-to-tr from-transparent via-blue-100/30 to-transparent opacity-70 group-hover:opacity-100 group-hover:animate-[liquid_8s_linear_infinite]"></div>
                <div className="absolute -inset-8 bg-gradient-to-br from-transparent via-red-100/20 to-transparent opacity-70 group-hover:opacity-100 group-hover:animate-[liquid_6s_linear_infinite] delay-100"></div>
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-white/50 pointer-events-none"></div>
              <div className="absolute inset-1 rounded-xl border border-white/30 pointer-events-none"></div>
            </div>

            {/* Profile Image */}
            <div className="absolute inset-4 rounded-xl overflow-hidden transition-all duration-700 group-hover:scale-[0.98]">
              <StrapiImage
                src={image.url}
                alt={image.alternativeText || `${namalengkap}'s profile picture`}
                width={420}
                height={520}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20 pointer-events-none"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,white/90%)] pointer-events-none mix-blend-overlay"></div>
            </div>

            {/* Reflection Spots */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/30 blur-xl group-hover:animate-[pulse_4s_ease-in-out_infinite]"></div>
              <div className="absolute bottom-24 right-24 w-24 h-24 rounded-full bg-white/40 blur-lg group-hover:animate-[pulse_3s_ease-in-out_infinite] delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
