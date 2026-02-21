import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';

export default function ClothingDetailScreen({ route, navigation }: any) {
  const { item } = route.params;
  const { state, dispatch } = useApp();

  const isInWishlist = state.wishlist.some(w => w.clothingItemId === item.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      const wishlistItem = state.wishlist.find(w => w.clothingItemId === item.id);
      if (wishlistItem) {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: wishlistItem.id });
      }
    } else {
      dispatch({ 
        type: 'ADD_TO_WISHLIST', 
        payload: { id: Date.now().toString(), userId: 'default', clothingItemId: item.id, addedAt: Date.now() } 
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/300' }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        {item.brand && <Text style={styles.brand}>{item.brand}</Text>}
        {item.size && <Text style={styles.size}>Size: {item.size}</Text>}
        {item.price && <Text style={styles.price}>${item.price}</Text>}
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.wishlistButton} onPress={toggleWishlist}>
            <Text style={styles.wishlistText}>{isInWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tryButton}>
            <Text style={styles.tryButtonText}>Try On</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  image: { width: '100%', height: 300, backgroundColor: '#eee' },
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  category: { fontSize: 16, color: 'gray', marginTop: 5, textTransform: 'capitalize' },
  brand: { fontSize: 16, color: '#333', marginTop: 10 },
  size: { fontSize: 16, color: '#333', marginTop: 5 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#6366f1', marginTop: 15 },
  actions: { marginTop: 20 },
  wishlistButton: { backgroundColor: 'white', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  wishlistText: { fontSize: 16 },
  tryButton: { backgroundColor: '#6366f1', padding: 15, borderRadius: 10, alignItems: 'center' },
  tryButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
