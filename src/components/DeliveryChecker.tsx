import React, { useState } from 'react';
import { DELIVERY_ZONES } from '../data/kitchenData';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';

export const DeliveryChecker: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>(DELIVERY_ZONES[0].name);

  const zone = DELIVERY_ZONES.find((z) => z.name === selectedZone) || DELIVERY_ZONES[0];

  return (
    <div className="w-full max-w-full p-4 sm:p-6 md:p-8 bg-[#FAF5ED] border border-[#1E1410]/12 rounded-[2px] overflow-hidden">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A8442A] mb-2">
        <MapPin className="w-3.5 h-3.5" />
        <span>Borkhera Kitchen Delivery Radius</span>
      </div>

      <h3 className="font-serif text-2xl font-normal text-[#1E1410]">
        Check your delivery timing in Kota.
      </h3>

      <p className="text-xs md:text-sm text-[#1E1410]/70 mt-1 font-body">
        Dispatched hot from Shubh Labh Enclave, Balaji Awas I, Borkhera.
      </p>

      {/* Select Locality Dropdown */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1E1410]/60 mb-2">
            Select Your Area or Hostel Pocket
          </label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full bg-[#F5EEE2] border border-[#1E1410]/20 text-[#1E1410] px-4 py-3 text-sm rounded-[2px] focus:outline-none focus:border-[#A8442A] font-body"
          >
            {DELIVERY_ZONES.map((z) => (
              <option key={z.name} value={z.name}>
                {z.name} (~{z.distanceKm} km from kitchen)
              </option>
            ))}
          </select>
        </div>

        {/* Live Calculation Card */}
        <div className="p-4 bg-[#EAE1D2]/70 border border-[#1E1410]/10 rounded-[2px] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <div className="text-[#1E1410]/50 uppercase text-[10px]">Estimated Arrival</div>
            <div className="text-base font-serif font-semibold text-[#1E1410] mt-0.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#A8442A]" />
              <span>{zone.estimatedMinutes} mins</span>
            </div>
          </div>

          <div>
            <div className="text-[#1E1410]/50 uppercase text-[10px]">Distance</div>
            <div className="text-base font-serif font-semibold text-[#1E1410] mt-0.5">
              {zone.distanceKm} km
            </div>
          </div>

          <div>
            <div className="text-[#1E1410]/50 uppercase text-[10px]">Delivery Fee</div>
            <div className="text-base font-serif font-semibold text-[#1E1410] mt-0.5">
              {zone.deliveryFee === 0 ? 'FREE (Local)' : `₹${zone.deliveryFee}`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#3C4A3A] font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Active delivery route available today until 10:30 PM.</span>
        </div>
      </div>
    </div>
  );
};
