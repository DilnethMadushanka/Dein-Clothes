// Prices, ratings and review counts are mock data. Replace with real catalogue values.
const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"];
const SHOE_SIZES = ["38", "39", "40", "41", "42", "43"];
const ONE = ["One size"];
const MONO = ["#0c0c0c", "#f4f4f2", "#8a8a86"];

export const products = [
  { id: 1, name: "Oversized Wool Overcoat", cat: "Outerwear", price: 48900, was: 69900, rating: 4.8, reviews: 214, img: "/images/products/overcoat.jpg", colors: MONO.slice(0, 2), sizes: CLOTHING_SIZES, isNew: true },
  { id: 2, name: "Heavy Cotton Tee", cat: "Men", price: 7900, was: 9900, rating: 4.6, reviews: 1380, img: "/images/products/tee.jpg", colors: MONO, sizes: CLOTHING_SIZES, best: true },
  { id: 3, name: "Pleated Wide Trouser", cat: "Women", price: 16500, was: 21500, rating: 4.7, reviews: 452, img: "/images/products/trouser.jpg", colors: MONO.slice(0, 2), sizes: CLOTHING_SIZES, best: true },
  { id: 4, name: "Leather Card Holder", cat: "Accessories", price: 9800, was: 12800, rating: 4.9, reviews: 689, img: "/images/products/cardholder.jpg", colors: MONO.slice(0, 1), sizes: ONE, best: true },
  { id: 5, name: "Boxy Poplin Shirt", cat: "Women", price: 13900, was: 17900, rating: 4.5, reviews: 307, img: "/images/products/shirt.jpg", colors: MONO.slice(0, 2), sizes: CLOTHING_SIZES, isNew: true },
  { id: 6, name: "Steel Link Watch", cat: "Accessories", price: 34500, was: 49000, rating: 4.8, reviews: 156, img: "/images/products/watch.jpg", colors: MONO.slice(0, 1), sizes: ONE },
  { id: 7, name: "Canvas Tote", cat: "Accessories", price: 11200, was: 14500, rating: 4.4, reviews: 523, img: "/images/products/tote.jpg", colors: MONO.slice(0, 2), sizes: ONE, best: true },
  { id: 8, name: "Knit Beanie", cat: "Accessories", price: 4800, was: 6800, rating: 4.7, reviews: 941, img: "/images/products/beanie.jpg", colors: MONO, sizes: ONE },
  { id: 9, name: "Everyday Straight Jean", cat: "Men", price: 14900, was: 19900, rating: 4.6, reviews: 768, img: "/images/categories/clothing.jpg", colors: MONO.slice(0, 1), sizes: CLOTHING_SIZES, isNew: true },
  { id: 10, name: "Leather Belt", cat: "Accessories", price: 6400, was: 8900, rating: 4.5, reviews: 392, img: "/images/categories/accessories.jpg", colors: MONO.slice(0, 1), sizes: ONE },
  { id: 11, name: "Chunky Sole Boot", cat: "Shoes", price: 27900, was: 38900, rating: 4.7, reviews: 245, img: "/images/categories/footwear.jpg", colors: MONO.slice(0, 1), sizes: SHOE_SIZES, isNew: true },
  { id: 12, name: "Padded Puffer Jacket", cat: "Outerwear", price: 31500, was: 45000, rating: 4.6, reviews: 318, img: "/images/categories/outerwear.jpg", colors: MONO.slice(0, 2), sizes: CLOTHING_SIZES },
  { id: 13, name: "Linen Overshirt", cat: "Men", price: 12900, was: 15900, rating: 4.4, reviews: 187, img: "/images/story/atelier.jpg", colors: MONO.slice(1, 3), sizes: CLOTHING_SIZES },
  { id: 14, name: "Ribbed Knit Dress", cat: "Women", price: 18900, was: 26900, rating: 4.8, reviews: 534, img: "/images/story/fabric.jpg", colors: MONO.slice(0, 2), sizes: CLOTHING_SIZES, best: true },
  { id: 15, name: "Tailored Blazer", cat: "Women", price: 29900, was: 39900, rating: 4.7, reviews: 266, img: "/images/story/craft.jpg", colors: MONO.slice(0, 1), sizes: CLOTHING_SIZES, isNew: true },
  { id: 16, name: "Cropped Bomber", cat: "Outerwear", price: 22900, was: 29900, rating: 4.5, reviews: 412, img: "/images/lookbook/look-1.jpg", colors: MONO.slice(0, 1), sizes: CLOTHING_SIZES },
  { id: 17, name: "Relaxed Hoodie", cat: "Men", price: 11900, was: 15900, rating: 4.7, reviews: 1022, img: "/images/lookbook/look-2.jpg", colors: MONO, sizes: CLOTHING_SIZES, best: true },
  { id: 18, name: "Slip Midi Skirt", cat: "Women", price: 10900, was: 14900, rating: 4.3, reviews: 238, img: "/images/lookbook/look-3.jpg", colors: MONO.slice(0, 2), sizes: CLOTHING_SIZES },
  { id: 19, name: "Low Top Sneaker", cat: "Shoes", price: 17900, was: 22900, rating: 4.6, reviews: 876, img: "/images/lookbook/look-4.jpg", colors: MONO.slice(0, 2), sizes: SHOE_SIZES, best: true },
  { id: 20, name: "Wide Leg Denim", cat: "Women", price: 15900, was: 21900, rating: 4.5, reviews: 603, img: "/images/lookbook/look-5.jpg", colors: MONO.slice(0, 1), sizes: CLOTHING_SIZES, isNew: true },
];

export const navCats = ["Women", "Men", "Outerwear", "Shoes", "Accessories"];

export const catThumbs = [
  { label: "Women", img: "/images/products/shirt.jpg" },
  { label: "Men", img: "/images/products/tee.jpg" },
  { label: "Outerwear", img: "/images/categories/outerwear.jpg" },
  { label: "Shoes", img: "/images/categories/footwear.jpg" },
  { label: "Accessories", img: "/images/categories/accessories.jpg" },
  { label: "Sale", img: "/images/lookbook/look-6.jpg" },
];

export const slides = [
  { title: "Outerwear, up to 40% off", text: "Wool coats, puffers and bombers for the cold months.", cta: "Shop outerwear", cat: "Outerwear", img: "/images/hero/hero-editorial.jpg" },
  { title: "Basics from Rs 4,800", text: "Tees, knitwear and everyday pieces in black and white.", cta: "Shop basics", cat: "Men", img: "/images/categories/clothing.jpg" },
  { title: "Accessories under Rs 10,000", text: "Bags, belts, card holders and watches.", cta: "Shop accessories", cat: "Accessories", img: "/images/categories/accessories.jpg" },
];

export const heroImg = "/images/hero/hero-editorial.jpg";
export const heroImg2 = "/images/products/cardholder.jpg";
export const styled = [1, 2, 3, 4, 5, 6].map((n) => `/images/lookbook/look-${n}.jpg`);

export const FREE_SHIP = 25000;
export const fmt = (n) => "Rs " + n.toLocaleString("en-LK");
export const off = (p) => Math.round((1 - p.price / p.was) * 100);
