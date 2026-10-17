# Maa Ki Rasoi (माँ की रसोई) · Owner's Menu & Website Update Guide

Namaste! This document is for the owner and management of **Maa Ki Rasoi** in Borkhera, Kota.
Your website was custom built using high-performance modern web standards (React, TypeScript, Tailwind CSS, Lenis Smooth Scroll) without any fragile page builder plugins or dependencies.

All kitchen data, dish prices, descriptions, timings, and delivery areas are centralized in a single file:
📂 `src/data/kitchenData.ts`

---

## 1. How to Update Daily Menu & Prices

Open `src/data/kitchenData.ts` in any code editor (VS Code, GitHub, or AI Studio).
Locate the `MENU_ITEMS` array:

```typescript
{
  id: 'ghar-ki-thali',
  name: 'Ghar Ki Thali',
  hindiName: 'घर की थाली',
  category: 'thali',
  price: 120, // <-- Edit price here (in Rupees)
  description: 'Four whole-wheat phulkas with desi ghee, yellow arhar dal tadka...',
  contents: [
    '4 Phulkas with Desi Ghee',
    'Yellow Arhar Dal Tadka',
    'Seasonal Sabzi of the Day',
    'Steamed Jeera Rice',
    'Salad & Hari Chutney'
  ],
  photoPrompt: 'Traditional kansa thali placed on raw wooden table...',
  isPopular: true,
  preparationTime: '20 mins'
}
```

- To change the price: replace `120` with your new price.
- To change what's in the thali: update the items in `contents`.
- To mark a dish as popular: set `isPopular: true`.

When a customer orders, the WhatsApp checkout drawer automatically reads these exact prices and builds the formatted receipt!

---

## 2. How to Update Student Tiffin Plans

Locate `TIFFIN_PLANS` in `src/data/kitchenData.ts`:

```typescript
{
  id: 'student-daily-single',
  name: 'Student Meal Plan',
  hindiName: 'विद्यार्थी टिफिन योजना',
  period: 'Single Meal / Daily (Lunch or Dinner)',
  pricePerMonth: 2700, // <-- Update monthly rate here
  mealsIncluded: '30 Meals per month (Lunch or Dinner)',
  dailyMenu: {
    rotis: '4 soft phulkas with desi ghee',
    dal: 'Yellow arhar, moong or chana dal (rotational)',
    sabzi: 'Fresh seasonal green sabzi (daily variety)',
    rice: 'Steamed rice or jeera rice',
    extra: 'Salad, lemon and home-made pickle'
  },
  highlights: [
    'Delivered hot to your PG or hostel room daily',
    'Non-heavy preparation safe for long study hours',
    'Free pauses up to 4 days during exams or visits'
  ]
}
```

---

## 3. How to Update Phone, Address & Timings

Locate `KITCHEN_INFO` at the very top of `src/data/kitchenData.ts`:

```typescript
export const KITCHEN_INFO = {
  name: 'Maa Ki Rasoi',
  hindiName: 'माँ की रसोई',
  descriptor: "Kota's homemade food cloud kitchen",
  address: 'Shubh Labh Enclave, B-128, Balaji Awas I, Borkhera, Kota 324002',
  phone: '+91 99283 63955',
  phoneRaw: '919928363955', // <-- WhatsApp target number without '+'
  timings: 'Daily 9:00 AM to 10:30 PM',
  lunchTimings: '11:30 AM to 3:30 PM',
  dinnerTimings: '7:00 PM to 10:30 PM',
  googleRating: 5.0,
  googleReviewCount: 91,
  fssaiNumber: '22223048000189', // <-- Replace with final FSSAI license
};
```

---

## 4. How to Update Delivery Radius & Fees

Locate `DELIVERY_ZONES` in `src/data/kitchenData.ts`. You can add new student areas (e.g., Jawahar Nagar, Landmark City, Dadabari) with their distance and delivery fees:

```typescript
{
  name: 'Kunhari & Landmark City',
  distanceKm: 5.2,
  estimatedMinutes: 35,
  minOrder: 120,
  deliveryFee: 25,
  status: 'active'
}
```

---

## 5. Adding Real Food Photos

When your authentic photography arrives:
1. Place image files into `/public/images/` (e.g. `thali.jpg`, `phulka.jpg`).
2. In `src/components/PhotoFrame.tsx` or `src/components/MenuSlides.tsx`, replace the fallback `<PhotoFrame />` with `<img src="/images/thali.jpg" alt="..." className="mask-arch object-cover w-full h-full" />`.
3. Refer to `PHOTO_CONTENT_CHECKLIST.md` for exact guidelines on lighting, composition, and angles.
