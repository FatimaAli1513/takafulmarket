/**
 * Takaful Market - Sample Data
 * Products, Collections, and Features data
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: 'watches' | 'belts' | 'wallets' | 'accessories';
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  features: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// Features data based on takafulmarket.site
export const FEATURES: Feature[] = [
  {
    id: '1',
    icon: 'rocket-outline',
    title: 'Fast Delivery',
    description: 'Get your products delivered in 24 hours',
  },
  {
    id: '2',
    icon: 'shield-checkmark-outline',
    title: 'Secure Payment',
    description: '100% safe encrypted payments',
  },
  {
    id: '3',
    icon: 'headset-outline',
    title: '24/7 Support',
    description: 'We\'re here to help anytime',
  },
  {
    id: '4',
    icon: 'refresh-outline',
    title: 'Easy Returns',
    description: 'Return within 7 days hassle-free',
  },
];

// Brand Promise data
export const BRAND_PROMISES = [
  {
    id: '1',
    icon: 'diamond-outline',
    title: 'Premium Quality',
    description: 'Every product is crafted with 100% genuine materials and extreme care.',
  },
  {
    id: '2',
    icon: 'airplane-outline',
    title: 'Secure Shipping',
    description: 'Safe and tracked delivery right to your doorstep, anywhere in the world.',
  },
  {
    id: '3',
    icon: 'happy-outline',
    title: 'Happy Customers',
    description: 'Join over 5,000+ satisfied customers who love our luxury accessories.',
    stat: '5,000+ Happy Customers',
  },
];

// Collections data - using placeholder URLs
export const COLLECTIONS: Collection[] = [
  {
    id: '1',
    title: 'Classic Timepieces',
    description: 'Explore our collection of premium watches designed for every occasion.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
    productCount: 24,
  },
  {
    id: '2',
    title: 'Leather Essentials',
    description: 'Handcrafted leather belts that combine durability with timeless style.',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800',
    productCount: 18,
  },
  {
    id: '3',
    title: 'Luxury Wallets',
    description: 'Sleek and functional wallets made from the finest genuine leather.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    productCount: 32,
  },
];

// Sample Products data - using placeholder URLs
export const PRODUCTS: Product[] = [
  // Watches
  {
    id: 'w1',
    name: 'Executive Gold Watch',
    price: 12500,
    originalPrice: 18000,
    description: 'Elegant gold-plated watch with genuine leather strap. Perfect for formal occasions.',
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400',
    rating: 4.8,
    reviews: 156,
    isNew: false,
    isBestseller: true,
    inStock: true,
    features: ['Water Resistant', 'Genuine Leather', '2 Year Warranty'],
  },
  {
    id: 'w2',
    name: 'Classic Silver Chronograph',
    price: 9800,
    description: 'Premium silver chronograph with Japanese movement.',
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400',
    rating: 4.6,
    reviews: 89,
    isNew: true,
    isBestseller: false,
    inStock: true,
    features: ['Chronograph', 'Stainless Steel', '1 Year Warranty'],
  },
  {
    id: 'w3',
    name: 'Luxury Black Dial',
    price: 15000,
    originalPrice: 20000,
    description: 'Sophisticated black dial watch with minimalist design.',
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    rating: 4.9,
    reviews: 234,
    isBestseller: true,
    inStock: true,
    features: ['Sapphire Glass', 'Swiss Movement', '3 Year Warranty'],
  },
  {
    id: 'w4',
    name: 'Sport Digital Watch',
    price: 6500,
    originalPrice: 8000,
    description: 'Rugged sports watch with multiple functions.',
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400',
    rating: 4.5,
    reviews: 178,
    isNew: true,
    inStock: true,
    features: ['Waterproof 50m', 'LED Display', 'Alarm & Timer'],
  },
  // Belts
  {
    id: 'b1',
    name: 'Premium Leather Belt',
    price: 2500,
    originalPrice: 3500,
    description: 'Handcrafted genuine leather belt with brass buckle.',
    category: 'belts',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400',
    rating: 4.7,
    reviews: 312,
    isBestseller: true,
    inStock: true,
    features: ['Genuine Leather', 'Brass Buckle', 'Adjustable Size'],
  },
  {
    id: 'b2',
    name: 'Executive Brown Belt',
    price: 3200,
    description: 'Italian leather belt with elegant design for professionals.',
    category: 'belts',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    rating: 4.5,
    reviews: 178,
    isNew: true,
    inStock: true,
    features: ['Italian Leather', 'Silver Buckle', 'Premium Finish'],
  },
  {
    id: 'b3',
    name: 'Casual Canvas Belt',
    price: 1500,
    description: 'Stylish canvas belt perfect for casual wear.',
    category: 'belts',
    image: 'https://images.unsplash.com/photo-1585856331426-d7a22eb66247?w=400',
    rating: 4.3,
    reviews: 95,
    inStock: true,
    features: ['Canvas Material', 'Metal Buckle', 'Multiple Colors'],
  },
  // Wallets
  {
    id: 'wl1',
    name: 'Bi-Fold Leather Wallet',
    price: 1800,
    originalPrice: 2500,
    description: 'Classic bi-fold wallet with multiple card slots and coin pocket.',
    category: 'wallets',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
    rating: 4.6,
    reviews: 445,
    isBestseller: true,
    inStock: true,
    features: ['6 Card Slots', 'Coin Pocket', 'RFID Protected'],
  },
  {
    id: 'wl2',
    name: 'Slim Card Holder',
    price: 1200,
    description: 'Minimalist card holder for the modern professional.',
    category: 'wallets',
    image: 'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=400',
    rating: 4.4,
    reviews: 267,
    isNew: true,
    inStock: true,
    features: ['4 Card Slots', 'Ultra Slim', 'Money Clip'],
  },
  {
    id: 'wl3',
    name: 'Long Leather Wallet',
    price: 2800,
    originalPrice: 3800,
    description: 'Spacious long wallet with zipper compartment.',
    category: 'wallets',
    image: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    features: ['12 Card Slots', 'Zipper Pocket', 'Phone Compartment'],
  },
  {
    id: 'wl4',
    name: 'Vintage Brown Wallet',
    price: 2200,
    description: 'Vintage style wallet with distressed leather finish.',
    category: 'wallets',
    image: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?w=400',
    rating: 4.7,
    reviews: 134,
    isBestseller: true,
    inStock: true,
    features: ['Distressed Leather', '8 Card Slots', 'ID Window'],
  },
];

// Get products by category
export const getProductsByCategory = (category: Product['category'] | 'all'): Product[] => {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter((product) => product.category === category);
};

// Get bestseller products
export const getBestsellers = (): Product[] => {
  return PRODUCTS.filter((product) => product.isBestseller);
};

// Get new arrivals
export const getNewArrivals = (): Product[] => {
  return PRODUCTS.filter((product) => product.isNew);
};

// Categories for filter/navigation
export const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'grid-outline' },
  { id: 'watches', name: 'Watches', icon: 'watch-outline' },
  { id: 'belts', name: 'Belts', icon: 'ribbon-outline' },
  { id: 'wallets', name: 'Wallets', icon: 'wallet-outline' },
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Ahmed Khan',
    rating: 5,
    comment: 'Excellent quality watches! The leather strap feels premium and the delivery was super fast.',
    date: '2 weeks ago',
  },
  {
    id: '2',
    name: 'Sara Ali',
    rating: 5,
    comment: 'Best wallet I have ever bought. The craftsmanship is exceptional.',
    date: '1 month ago',
  },
  {
    id: '3',
    name: 'Usman Malik',
    rating: 4,
    comment: 'Great collection and affordable prices. Will definitely order again!',
    date: '3 weeks ago',
  },
];
