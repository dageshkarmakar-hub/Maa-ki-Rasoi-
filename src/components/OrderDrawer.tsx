import React, { useState } from 'react';
import { CartItem } from '../types';
import { KITCHEN_INFO } from '../data/kitchenData';
import { X, Plus, Minus, Trash2, Send, ExternalLink } from 'lucide-react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('As soon as ready (approx 25-35 mins)');
  const [instructions, setInstructions] = useState('');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  const handleSendWhatsApp = () => {
    let message = `*NEW ORDER - MAA KI RASOI (माँ की रसोई)*\n`;
    message += `_Borkhera, Kota Cloud Kitchen_\n\n`;

    if (customerName.trim()) {
      message += `*Customer:* ${customerName.trim()}\n`;
    }
    if (address.trim()) {
      message += `*Delivery Address:* ${address.trim()}\n`;
    }
    message += `*Preferred Delivery Slot:* ${deliveryTime}\n\n`;

    message += `*ORDER ITEMS:*\n`;
    cartItems.forEach((ci, idx) => {
      message += `${idx + 1}. ${ci.item.name} (${ci.item.hindiName}) x ${ci.quantity} = ₹${ci.item.price * ci.quantity}\n`;
    });

    message += `\n*TOTAL MEAL VALUE: ₹${totalAmount}*\n`;

    if (instructions.trim()) {
      message += `*Kitchen Instructions:* ${instructions.trim()}\n`;
    }

    message += `\nPlease confirm preparation and estimated dispatch time. Thank you.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${KITCHEN_INFO.phoneRaw}?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1E1410]/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-6">
        <div className="w-full max-w-md bg-[#FAF5ED] text-[#1E1410] border-l border-[#1E1410]/15 flex flex-col shadow-2xl relative">
          {/* Header */}
          <div className="p-6 border-b border-[#1E1410]/12 flex items-center justify-between bg-[#F5EEE2]">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#A8442A]">
                Light Order Cart
              </div>
              <h2 className="font-serif text-2xl font-normal text-[#1E1410] mt-0.5">
                Your Rasoi Selection
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#1E1410]/60 hover:text-[#1E1410] transition-colors rounded-[2px]"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="font-serif text-xl text-[#1E1410]/60 italic">
                  Your thali is currently empty
                </div>
                <p className="text-xs text-[#1E1410]/60 font-mono max-w-xs mx-auto">
                  Select your favorite thali, phulkas with desi ghee, or daily tiffin from the menu to proceed.
                </p>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#1E1410]/60 border-b border-[#1E1410]/10 pb-2">
                    <span>SELECTED DISHES ({cartItems.length})</span>
                    <button
                      onClick={onClearCart}
                      className="hover:text-[#A8442A] transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  {cartItems.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-[#F5EEE2] border border-[#1E1410]/10 rounded-[2px] flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="font-serif font-medium text-sm text-[#1E1410] truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] font-hindi text-[#A8442A]">
                          {item.hindiName}
                        </div>
                        <div className="text-xs font-mono text-[#1E1410]/70">
                          ₹{item.price} each
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center border border-[#1E1410]/20 rounded-[2px] bg-[#FAF5ED]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-[#EAE1D2] text-[#1E1410]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center font-mono text-xs font-semibold tabular-nums">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-[#EAE1D2] text-[#1E1410]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-[#1E1410]/40 hover:text-[#A8442A] transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Information Input Form */}
                <div className="space-y-3 pt-4 border-t border-[#1E1410]/12">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#1E1410]/70">
                    Delivery & Contact Details
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#1E1410]/60 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#F5EEE2] border border-[#1E1410]/20 text-xs text-[#1E1410] px-3 py-2 rounded-[2px] focus:outline-none focus:border-[#A8442A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#1E1410]/60 mb-1">
                      Hostel / PG / Room / House Address in Kota
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Room 204, Balaji Residency, Near Allen Landmark, Kunhari or Borkhera"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#F5EEE2] border border-[#1E1410]/20 text-xs text-[#1E1410] px-3 py-2 rounded-[2px] focus:outline-none focus:border-[#A8442A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#1E1410]/60 mb-1">
                      Preferred Delivery Timing
                    </label>
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full bg-[#F5EEE2] border border-[#1E1410]/20 text-xs text-[#1E1410] px-3 py-2 rounded-[2px] focus:outline-none focus:border-[#A8442A]"
                    >
                      <option value="As soon as ready (approx 25-35 mins)">
                        Immediate (25-35 mins fresh prep)
                      </option>
                      <option value="Lunch: 12:30 PM - 1:30 PM">
                        Today Lunch (12:30 PM to 1:30 PM)
                      </option>
                      <option value="Dinner: 7:30 PM - 8:30 PM">
                        Tonight Dinner (7:30 PM to 8:30 PM)
                      </option>
                      <option value="Custom Time Slot">
                        Custom Slot (specify below)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#1E1410]/60 mb-1">
                      Custom Cooking Note (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kam mirch, extra ghee on rotis, send salad"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full bg-[#F5EEE2] border border-[#1E1410]/20 text-xs text-[#1E1410] px-3 py-2 rounded-[2px] focus:outline-none focus:border-[#A8442A]"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Action */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#F5EEE2] border-t border-[#1E1410]/12 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#1E1410]/70">
                  Subtotal (Direct Kitchen Rate)
                </span>
                <span className="font-serif text-2xl font-bold text-[#1E1410] tabular-nums">
                  ₹{totalAmount}
                </span>
              </div>

              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 bg-[#A8442A] hover:bg-[#8F3720] text-[#FAF5ED] text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-[2px]"
                data-cursor="ORDER"
              >
                <Send className="w-4 h-4" />
                <span>Send Order via WhatsApp (+91 99283 63955)</span>
              </button>

              {/* Secondary ordering channels */}
              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] font-mono text-[#1E1410]/60 border-t border-[#1E1410]/10">
                <span>Also on:</span>
                <a
                  href={`https://wa.me/${KITCHEN_INFO.phoneRaw}?text=Hi%20Maa%20Ki%20Rasoi,%20I%20want%20to%20order%20food%20in%20Kota`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#A8442A] inline-flex items-center gap-1"
                >
                  Zomato Partner Link <ExternalLink className="w-3 h-3" />
                </a>
                <span>·</span>
                <a
                  href={`https://wa.me/${KITCHEN_INFO.phoneRaw}?text=Hi%20Maa%20Ki%20Rasoi,%20I%20want%20to%20order%20food%20in%20Kota`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#A8442A] inline-flex items-center gap-1"
                >
                  Swiggy Link <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
