# VirtualTry

A virtual trial room app that allows users to try on clothing virtually using AR and AI body estimation.

## Features

- 📸 **Virtual Try-On** - See how clothes look on you using your camera
- 👕 **Clothing Catalog** - Add and manage your wardrobe
- 📏 **Body Profiles** - Save your measurements for size recommendations
- 🎨 **Outfit Builder** - Mix and match clothing items
- ❤️ **Wishlist** - Save items you love

## Tech Stack

- **React Native** with Expo
- **TypeScript**
- **AsyncStorage** for local data persistence
- **expo-camera** for camera functionality

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

```bash
# Install dependencies
cd mobile
npm install

# Start the app
npm start
```

### Running on Device

1. Install **Expo Go** on your iOS/Android device
2. Scan the QR code from `npm start`

### Building for Production

```bash
# Generate native projects
npx expo prebuild

# Build for iOS
npx expo run:ios

# Build for Android
npx expo run:android
```

## Project Structure

```
VirtualTry/
├── mobile/                 # React Native (Expo) app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/     # App state management
│   │   ├── navigation/  # Navigation setup
│   │   ├── screens/     # App screens
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utility functions
│   ├── App.tsx          # Main app entry
│   └── app.json         # Expo config
└── SPEC.md              # Project specification
```

## Screens

1. **Home** - Dashboard with stats and quick actions
2. **Camera** - Virtual try-on with camera
3. **Wardrobe** - Browse and manage clothing
4. **Outfits** - Create outfit combinations
5. **Profile** - Manage body profiles and settings

## License

MIT
