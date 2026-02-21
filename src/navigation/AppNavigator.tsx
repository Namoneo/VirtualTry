import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import CatalogScreen from '../screens/CatalogScreen';
import OutfitsScreen from '../screens/OutfitsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddClothingScreen from '../screens/AddClothingScreen';
import AddBodyProfileScreen from '../screens/AddBodyProfileScreen';
import ClothingDetailScreen from '../screens/ClothingDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CatalogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CatalogMain" component={CatalogScreen} options={{ title: 'Clothing' }} />
      <Stack.Screen name="AddClothing" component={AddClothingScreen} options={{ title: 'Add Item' }} />
      <Stack.Screen name="ClothingDetail" component={ClothingDetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="AddBodyProfile" component={AddBodyProfileScreen} options={{ title: 'Add Body Profile' }} />
    </Stack.Navigator>
  );
}

function getTabIcon(routeName: string, focused: boolean): keyof typeof Ionicons.glyphMap {
  if (routeName === 'Home') {
    return focused ? 'home' : 'home-outline';
  }
  if (routeName === 'Try On') {
    return focused ? 'camera' : 'camera-outline';
  }
  if (routeName === 'Wardrobe') {
    return focused ? 'shirt' : 'shirt-outline';
  }
  if (routeName === 'Outfits') {
    return focused ? 'layers' : 'layers-outline';
  }
  if (routeName === 'Profile') {
    return focused ? 'person' : 'person-outline';
  }
  return 'help-outline';
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = getTabIcon(route.name, focused);
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#6366f1' },
          headerTintColor: 'white',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Try On" component={CameraScreen} />
        <Tab.Screen name="Wardrobe" component={CatalogStack} />
        <Tab.Screen name="Outfits" component={OutfitsScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
