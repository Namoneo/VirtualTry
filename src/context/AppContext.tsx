import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, User, BodyProfile, ClothingItem, Outfit, CartItem, WishlistItem } from '../types';

// Storage keys
const STORAGE_KEYS = {
  USER: '@virtualtry_user',
  BODY_PROFILES: '@virtualtry_body_profiles',
  CLOTHING: '@virtualtry_clothing',
  OUTFITS: '@virtualtry_outfits',
  CART: '@virtualtry_cart',
  WISHLIST: '@virtualtry_wishlist',
};

// Initial state
const initialState: AppState = {
  user: null,
  bodyProfiles: [],
  clothingItems: [],
  outfits: [],
  cart: [],
  wishlist: [],
  isLoading: true,
};

// Action types
type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_BODY_PROFILES'; payload: BodyProfile[] }
  | { type: 'ADD_BODY_PROFILE'; payload: BodyProfile }
  | { type: 'UPDATE_BODY_PROFILE'; payload: BodyProfile }
  | { type: 'DELETE_BODY_PROFILE'; payload: string }
  | { type: 'SET_CLOTHING'; payload: ClothingItem[] }
  | { type: 'ADD_CLOTHING'; payload: ClothingItem }
  | { type: 'DELETE_CLOTHING'; payload: string }
  | { type: 'SET_OUTFITS'; payload: Outfit[] }
  | { type: 'ADD_OUTFIT'; payload: Outfit }
  | { type: 'DELETE_OUTFIT'; payload: string }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'SET_WISHLIST'; payload: WishlistItem[] }
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_BODY_PROFILES':
      return { ...state, bodyProfiles: action.payload };
    case 'ADD_BODY_PROFILE':
      return { ...state, bodyProfiles: [...state.bodyProfiles, action.payload] };
    case 'UPDATE_BODY_PROFILE':
      return {
        ...state,
        bodyProfiles: state.bodyProfiles.map(p => 
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_BODY_PROFILE':
      return {
        ...state,
        bodyProfiles: state.bodyProfiles.filter(p => p.id !== action.payload),
      };
    case 'SET_CLOTHING':
      return { ...state, clothingItems: action.payload };
    case 'ADD_CLOTHING':
      return { ...state, clothingItems: [...state.clothingItems, action.payload] };
    case 'DELETE_CLOTHING':
      return {
        ...state,
        clothingItems: state.clothingItems.filter(i => i.id !== action.payload),
      };
    case 'SET_OUTFITS':
      return { ...state, outfits: action.payload };
    case 'ADD_OUTFIT':
      return { ...state, outfits: [...state.outfits, action.payload] };
    case 'DELETE_OUTFIT':
      return {
        ...state,
        outfits: state.outfits.filter(o => o.id !== action.payload),
      };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) };
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.payload };
    case 'ADD_TO_WISHLIST':
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, wishlist: state.wishlist.filter(i => i.id !== action.payload) };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from storage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data to storage when state changes
  useEffect(() => {
    if (!state.isLoading) {
      saveData();
    }
  }, [state.user, state.bodyProfiles, state.clothingItems, state.outfits, state.cart, state.wishlist]);

  const loadData = async () => {
    try {
      const [userJson, profilesJson, clothingJson, outfitsJson, cartJson, wishlistJson] = 
        await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.BODY_PROFILES),
          AsyncStorage.getItem(STORAGE_KEYS.CLOTHING),
          AsyncStorage.getItem(STORAGE_KEYS.OUTFITS),
          AsyncStorage.getItem(STORAGE_KEYS.CART),
          AsyncStorage.getItem(STORAGE_KEYS.WISHLIST),
        ]);

      if (userJson) dispatch({ type: 'SET_USER', payload: JSON.parse(userJson) });
      if (profilesJson) dispatch({ type: 'SET_BODY_PROFILES', payload: JSON.parse(profilesJson) });
      if (clothingJson) dispatch({ type: 'SET_CLOTHING', payload: JSON.parse(clothingJson) });
      if (outfitsJson) dispatch({ type: 'SET_OUTFITS', payload: JSON.parse(outfitsJson) });
      if (cartJson) dispatch({ type: 'SET_CART', payload: JSON.parse(cartJson) });
      if (wishlistJson) dispatch({ type: 'SET_WISHLIST', payload: JSON.parse(wishlistJson) });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveData = async () => {
    try {
      await Promise.all([
        state.user && AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user)),
        AsyncStorage.setItem(STORAGE_KEYS.BODY_PROFILES, JSON.stringify(state.bodyProfiles)),
        AsyncStorage.setItem(STORAGE_KEYS.CLOTHING, JSON.stringify(state.clothingItems)),
        AsyncStorage.setItem(STORAGE_KEYS.OUTFITS, JSON.stringify(state.outfits)),
        AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart)),
        AsyncStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(state.wishlist)),
      ]);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
