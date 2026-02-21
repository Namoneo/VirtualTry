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

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'home' :            } else if 'home-outline';
 (route.name === 'Try On') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Wardrobe') {
              iconName = focused ? 'shirt' : 'shirt-outline';
            } else if (route.name === 'Outfits') {
              iconName = focused ? 'layers' : 'layers-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'help-outline';
            }

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

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="AddBodyProfile" component={AddBodyProfileScreen} options={{ title: 'Add Body Profile' }} />
    </Stack.Navigator>
  );
}
