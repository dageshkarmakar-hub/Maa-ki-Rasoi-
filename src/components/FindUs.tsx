import React from 'react';
import { KITCHEN_INFO } from '../data/kitchenData';
import { DeliveryChecker } from './DeliveryChecker';
import { MapPin, Phone, Navigation, Clock, ShieldCheck } from 'lucide-react';

export const FindUs: React.FC = () => {
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Maa Ki Rasoi Shubh Labh Enclave B-128 Balaji Awas I Borkhera Kota 324002'
  )}`;

  return (
    <section
      id="location"
      className="relative w-full max-w-full bg-[#F5EEE2] py-20 md:py-32 px-4 sm:px-6 md:px-12 border-b border-[#1E1410]/12 overflow-x-clip"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1E1410]/12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#A8442A] uppercase mb-2">
              <span>07</span>
              <span>·</span>
              <span>Cloud Kitchen Location & Hours</span>
              <span>·</span>
              <span className="font-hindi text-[#1E1410]/60">पता एवं संपर्क</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1E1410]">
              Visit our rasoi or call for <em className="italic font-normal text-[#A8442A]">delivery</em>.
            </h2>
          </div>

          <p className="text-xs md:text-sm font-mono text-[#1E1410]/70 max-w-sm">
            Situated in Balaji Awas I, Borkhera. We welcome students and families to inspect our food-grade preparation area.
          </p>
        </div>

        {/* 2-Column Split: Architectural Muted Map & Direct Details */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Direct Info Card & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-[#FAF5ED] border border-[#1E1410]/12 rounded-[2px] space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#A8442A] uppercase">
                  Physical Kitchen Address
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#1E1410] mt-1">
                  Maa Ki Rasoi (माँ की रसोई)
                </h3>
                <p className="text-sm text-[#1E1410]/80 mt-2 font-body leading-relaxed">
                  {KITCHEN_INFO.address}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#1E1410]/10 text-xs font-mono">
                <div className="flex items-start gap-2.5 text-[#1E1410]/80">
                  <Clock className="w-4 h-4 text-[#A8442A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1E1410]">Operating Hours:</div>
                    <div>{KITCHEN_INFO.timings}</div>
                    <div className="text-[11px] text-[#1E1410]/60 mt-0.5">
                      Lunch dispatch: {KITCHEN_INFO.lunchTimings}
                      <br />
                      Dinner dispatch: {KITCHEN_INFO.dinnerTimings}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[#1E1410]/80 pt-2">
                  <Phone className="w-4 h-4 text-[#A8442A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1E1410]">Direct Kitchen Line:</div>
                    <a
                      href={`tel:${KITCHEN_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-serif font-bold text-[#1E1410] hover:text-[#A8442A] transition-colors"
                    >
                      {KITCHEN_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[#1E1410]/80 pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#3C4A3A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1E1410]">Food Hygiene Standard:</div>
                    <div>Pure Vegetarian Kitchen · FSSAI Registered</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-6 border-t border-[#1E1410]/10 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${KITCHEN_INFO.phone.replace(/\s+/g, '')}`}
                className="flex-1 py-3 px-4 bg-[#A8442A] hover:bg-[#8F3720] text-[#FAF5ED] text-xs font-mono uppercase tracking-wider text-center flex items-center justify-center gap-2 rounded-[2px] transition-colors"
                data-cursor="CALL"
              >
                <Phone className="w-4 h-4" />
                <span>Call Kitchen</span>
              </a>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#1E1410] hover:bg-[#2C201B] text-[#FAF5ED] text-xs font-mono uppercase tracking-wider text-center flex items-center justify-center gap-2 rounded-[2px] transition-colors"
                data-cursor="DIRECTIONS"
              >
                <Navigation className="w-4 h-4" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Muted Tone Map & Delivery Zone Calculator */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Muted Tone Stylized Architectural Map */}
            <div className="relative h-64 md:h-72 w-full bg-[#EAE1D2] border border-[#1E1410]/15 overflow-hidden rounded-[2px] flex items-center justify-center p-6">
              {/* Architectural Grid & Road representation */}
              <svg
                className="absolute inset-0 w-full h-full opacity-40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="grid-pattern"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#1E1410"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                {/* Stylized road lines representing Borkhera & Chambal corridor */}
                <path
                  d="M -20 180 Q 200 120 450 140 T 900 100"
                  fill="none"
                  stroke="#A8442A"
                  strokeWidth="3"
                  strokeDasharray="6 3"
                />
                <path
                  d="M 120 -20 Q 180 180 250 400"
                  fill="none"
                  stroke="#1E1410"
                  strokeWidth="2"
                />
                <path
                  d="M 380 -20 Q 320 220 300 400"
                  fill="none"
                  stroke="#1E1410"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Map pin marker for kitchen */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#A8442A] text-[#FAF5ED] flex items-center justify-center shadow-lg border-2 border-[#FAF5ED] animate-pulse">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="mt-3 bg-[#1E1410] text-[#FAF5ED] px-3.5 py-1.5 rounded-[2px] text-xs font-mono shadow-md text-center border border-[#FAF5ED]/20">
                  <div className="font-bold text-[#C48A1F]">MAA KI RASOI</div>
                  <div className="text-[10px] opacity-80">Balaji Awas I, Borkhera</div>
                </div>
              </div>

              {/* External Map Link Badge */}
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 text-[10px] font-mono bg-[#FAF5ED]/90 hover:bg-[#FAF5ED] text-[#1E1410] px-3 py-1 border border-[#1E1410]/20 rounded-[2px] transition-colors"
              >
                Open in Google Maps ↗
              </a>
            </div>

            {/* Embedded Delivery Radius Checker */}
            <DeliveryChecker />
          </div>
        </div>
      </div>
    </section>
  );
};
