export interface MenuItem {
  id: string;
  name: string;
  hindiName: string;
  category: 'thali' | 'roti-sabzi' | 'dal-chawal' | 'tiffin' | 'sweets-more';
  price: number;
  description: string;
  contents?: string[];
  photoPrompt: string;
  isPopular?: boolean;
  preparationTime: string;
}

export interface TiffinPlan {
  id: string;
  name: string;
  hindiName: string;
  period: string;
  pricePerMonth: number;
  mealsIncluded: string;
  dailyMenu: {
    rotis: string;
    dal: string;
    sabzi: string;
    rice: string;
    extra: string;
  };
  highlights: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  locationRole: string; // e.g. "Allen Student, Talwandi" or "Resident, Borkhera"
  rating: number;
  date: string;
  quote: string;
  highlightPhrase: string;
}

export interface DeliveryZone {
  name: string;
  distanceKm: number;
  estimatedMinutes: number;
  minOrder: number;
  deliveryFee: number;
  status: 'active' | 'scheduled';
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialNote?: string;
}
