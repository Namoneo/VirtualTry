// User Profile
export interface User {
  id: string;
  name: string;
  email?: string;
  createdAt: number;
}

// Body Profile for measurements
export interface BodyProfile {
  id: string;
  userId: string;
  name: string;
  height: number; // cm
  weight: number; // kg
  chest: number; // cm
  waist: number; // cm
  hips: number; // cm
  photo?: string; // local URI
  createdAt: number;
  updatedAt: number;
}

// Clothing Categories
export type ClothingCategory = 
  | 'tops' 
  | 'bottoms' 
  | 'dresses' 
  | 'outerwear' 
  | 'shoes' 
  | 'accessories';

// Clothing Item
export interface ClothingItem {
  id: string;
  userId: string;
  name: string;
  category: ClothingCategory;
  brand?: string;
  size?: string;
  color?: string;
  imageUrl: string; // local URI
  price?: number;
  createdAt: number;
}

// Outfit
export interface Outfit {
  id: string;
  userId: string;
  name: string;
  items: string[]; // clothing item IDs
  createdAt: number;
}

// Cart Item
export interface CartItem {
  id: string;
  userId: string;
  clothingItemId: string;
  addedAt: number;
}

// Wishlist Item
export interface WishlistItem {
  id: string;
  userId: string;
  clothingItemId: string;
  addedAt: number;
}

// App State
export interface AppState {
  user: User | null;
  bodyProfiles: BodyProfile[];
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  isLoading: boolean;
}
