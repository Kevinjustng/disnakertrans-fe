import React from "react";
import { ContactProps } from "@/types";

export function Contact({ name, number, email, map }: ContactProps) {
  return (
    
    <div className="bg-white">
      {/* Title Section */}
      <section id="hubungi-kami" className="text-left pt-24 pb-12 px-8 bg-white max-w-7xl mx-auto">
        <h2 className="font-light tracking-[0.2143rem] text-[1.875rem] text-gray-600 uppercase mb-2 leading-[1.2]">
          DISNAKERTRANS SULUT
        </h2>
        <h1 className="font-bold tracking-[0.125rem] text-[3rem] text-gray-800 mb-4 leading-[1.2]">
          HUBUNGI KAMI
        </h1>
        <p className="italic font-normal tracking-[0.0625rem] text-[1.125rem] text-gray-600 leading-[1.875rem] mb-4">
          PROVINSI SULAWESI UTARA.
        </p>
        <div className="w-20 h-[1px] bg-gray-400"></div>
      </section>

      {/* Contact Section */}
      <div className="bg-gray-50 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16">
            {/* LEFT SIDE - Contact Info */}
            <div className="flex-1 space-y-6">
              <h2
                className="text-gray-800 text-3xl font-semibold italic border-b-2 border-black inline-block pb-1"
                style={{ fontFamily: "serif" }}
              >
                Kontak
              </h2>

              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  <span className="font-bold">Nama:</span> {name}
                </p>
                <p>
                  <span className="font-bold">Nomor:</span> {number}
                </p>
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  <a
                    href={`mailto:${email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {email}
                  </a>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - Map */}
            <div className="w-full h-[520px] relative rounded-2xl overflow-hidden shadow-lg">
  <iframe
    src={map}
    className="w-full h-full"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
