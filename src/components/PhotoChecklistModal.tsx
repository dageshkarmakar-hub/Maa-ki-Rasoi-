import React from 'react';
import { X, Camera, CheckSquare, AlertCircle } from 'lucide-react';

interface PhotoChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoChecklistModal: React.FC<PhotoChecklistModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const items = [
    {
      category: '01. The Signature Ghar Ki Thali',
      shots: [
        'Top-down shot of brass/steel thali on natural wood table in day side-light.',
        'Visible steam rising from freshly tempered yellow arhar dal.',
        'Four phulkas brushed with glistening desi ghee stacked naturally.',
        'Sliced red onions, lemon wedge, and fresh seasonal dry sabzi.',
      ],
      aspectRatio: '4:5 vertical arch mask',
    },
    {
      category: '02. Tawa Action & Phulka Puffing',
      shots: [
        'Close-up of hands pulling a ballooned hot phulka off the cast iron tawa.',
        'Ghee brush glinting under warm 45-degree kitchen lamp.',
        'Natural motion blur of tawa flame, zero staged props.',
      ],
      aspectRatio: '4:3 or 1:1 square',
    },
    {
      category: '03. Dal & Mandi Spices',
      shots: [
        'Cumin seeds, dried whole red chillies and garlic sizzling in hot ladle ghee.',
        'Fresh whole spices (cloves, cardamom, black pepper) in raw clay bowls.',
      ],
      aspectRatio: '16:9 banner or 4:3',
    },
    {
      category: '04. Packaging & Student Delivery Tiffin',
      shots: [
        'Multi-compartment food grade leakproof container tightly sealed.',
        'Rotis wrapped in clean parchment butter paper, not aluminum foil.',
        'Insulated delivery bag with kitchen address tag.',
      ],
      aspectRatio: '4:5 vertical',
    },
    {
      category: '05. The Borkhera Kitchen & Team',
      shots: [
        'Spotless stainless steel preparation counter at Balaji Awas I.',
        'Cook in clean white apron kneading fresh chakki atta.',
        'Natural candid atmosphere, proud and dignified.',
      ],
      aspectRatio: '16:9 landscape',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E1410]/70 backdrop-blur-sm"
      />

      <div className="relative bg-[#FAF5ED] text-[#1E1410] max-w-2xl w-full p-6 md:p-8 border border-[#1E1410]/20 rounded-[2px] shadow-2xl max-h-[90vh] overflow-y-auto z-10">
        <div className="flex items-start justify-between border-b border-[#1E1410]/12 pb-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#A8442A]">
              Photography Protocol
            </div>
            <h2 className="font-serif text-2xl font-normal text-[#1E1410] mt-1">
              Client Content & Photo Checklist
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#1E1410]/60 hover:text-[#1E1410]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 py-6 text-xs md:text-sm text-[#1E1410]/80 font-body">
          <div className="p-4 bg-[#EAE1D2]/70 border border-[#1E1410]/15 rounded-[2px] flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#A8442A] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-mono text-xs font-semibold text-[#1E1410] uppercase">
                Zero Stock Photos · Zero AI Slop
              </div>
              <p className="text-xs text-[#1E1410]/75">
                The current website shows honest archival labels instead of fake food pictures. When you take photos on an iPhone or DSLR with natural side-window light, drop them into <code className="bg-[#FAF5ED] px-1 py-0.5 font-mono text-[#A8442A]">/public/images/</code>.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {items.map((sec, idx) => (
              <div key={idx} className="border border-[#1E1410]/10 p-4 rounded-[2px] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-medium text-[#1E1410]">
                    {sec.category}
                  </h4>
                  <span className="text-[10px] font-mono text-[#A8442A] uppercase">
                    {sec.aspectRatio}
                  </span>
                </div>

                <ul className="space-y-1.5 pl-1 pt-1">
                  {sec.shots.map((shot, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 text-xs text-[#1E1410]/80">
                      <CheckSquare className="w-3.5 h-3.5 text-[#3C4A3A] shrink-0 mt-0.5" />
                      <span>{shot}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-[#FAF5ED] border border-[#1E1410]/15 text-xs font-mono text-[#1E1410]/80 space-y-1 rounded-[2px]">
            <div className="font-bold text-[#A8442A]">Golden Rule for Maa Ki Rasoi:</div>
            <div>Shoot during 11:00 AM to 1:00 PM when morning sunlight hits the kitchen. Let real steam rise naturally. No oil spray or hairspray tricks.</div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1E1410]/12 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1E1410] text-[#FAF5ED] text-xs font-mono uppercase tracking-wider rounded-[2px]"
          >
            Close Checklist
          </button>
        </div>
      </div>
    </div>
  );
};
