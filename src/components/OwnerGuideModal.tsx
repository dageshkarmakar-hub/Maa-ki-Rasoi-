import React from 'react';
import { X, CheckCircle, FileText, Code } from 'lucide-react';

interface OwnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerGuideModal: React.FC<OwnerGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
              Owner Documentation
            </div>
            <h2 className="font-serif text-2xl font-normal text-[#1E1410] mt-1">
              How to Update Menu & Pricing
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
          <p>
            Welcome, Rasoi Owner. This website was built with direct, cleanly structured data files so you can change prices, add seasonal dishes, or update daily tiffin plans without touching complex UI code.
          </p>

          <div className="p-4 bg-[#EAE1D2]/80 border border-[#1E1410]/10 rounded-[2px] space-y-2">
            <div className="font-mono font-semibold text-xs text-[#1E1410] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#A8442A]" />
              <span>Primary Menu File: <code className="bg-[#FAF5ED] px-1.5 py-0.5 rounded text-[#A8442A]">src/data/kitchenData.ts</code></span>
            </div>
            <p className="text-xs text-[#1E1410]/70">
              Open this file in any text editor. You will see clearly organized sections:
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-[#1E1410]/10 p-4 rounded-[2px]">
              <h4 className="font-serif text-base font-medium text-[#1E1410] mb-1">
                1. Updating Dish Prices & Names
              </h4>
              <p className="text-xs text-[#1E1410]/70 mb-2">
                Locate <code className="font-mono text-[#A8442A]">MENU_ITEMS</code>. Change the <code className="font-mono">price: 120</code> number or edit the description:
              </p>
              <pre className="p-3 bg-[#1E1410] text-[#FAF5ED] font-mono text-[11px] rounded overflow-x-auto">
{`{
  id: 'ghar-ki-thali',
  name: 'Ghar Ki Thali',
  hindiName: 'घर की थाली',
  price: 120, // <- Change price here
  description: 'Four whole-wheat phulkas with desi ghee...'
}`}
              </pre>
            </div>

            <div className="border border-[#1E1410]/10 p-4 rounded-[2px]">
              <h4 className="font-serif text-base font-medium text-[#1E1410] mb-1">
                2. Updating Tiffin Monthly Rates
              </h4>
              <p className="text-xs text-[#1E1410]/70 mb-2">
                Locate <code className="font-mono text-[#A8442A]">TIFFIN_PLANS</code>. Adjust the price or daily rotation items:
              </p>
              <pre className="p-3 bg-[#1E1410] text-[#FAF5ED] font-mono text-[11px] rounded overflow-x-auto">
{`{
  id: 'student-daily-single',
  name: 'Student Meal Plan',
  pricePerMonth: 2700, // <- Change rate here
  dailyMenu: { rotis: '4 soft phulkas with desi ghee', ... }
}`}
              </pre>
            </div>

            <div className="border border-[#1E1410]/10 p-4 rounded-[2px]">
              <h4 className="font-serif text-base font-medium text-[#1E1410] mb-1">
                3. Updating Phone or Address
              </h4>
              <p className="text-xs text-[#1E1410]/70 mb-2">
                Locate <code className="font-mono text-[#A8442A]">KITCHEN_INFO</code> at the top of the file to change timings, WhatsApp number, or FSSAI registration details.
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#FAF5ED] border border-[#3C4A3A]/30 text-[#3C4A3A] text-xs font-mono flex items-center gap-2 rounded-[2px]">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>All WhatsApp orders are automatically formatted with the new prices.</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1E1410]/12 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1E1410] text-[#FAF5ED] text-xs font-mono uppercase tracking-wider rounded-[2px]"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
