import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useApp } from '../context/AppContext';

export default function HomeScreen({ navigation }: any) {
  const { state } = useApp();
  
  const stats = {
    clothingItems: state.clothingItems.length,
    outfits: state.outfits.length,
    bodyProfiles: state.bodyProfiles.length,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to VirtualTry</Text>
        <Text style={styles.subtitle}>Your personal virtual fitting room</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => navigation.navigate('Try On')}
        >
          <Text style={styles.actionIcon}>📸</Text>
          <Text style={styles.actionText}>Try On</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => navigation.navigate('Wardrobe', { screen: 'AddClothing' })}
        >
          <Text style={styles.actionIcon}>👕</Text>
          <Text style={styles.actionText}>Add Clothes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.clothingItems}</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.outfits}</Text>
            <Text style={styles.statLabel}>Outfits</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.bodyProfiles}</Text>
            <Text style={styles.statLabel}>Profiles</Text>
          </View>
        </View>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Items</Text>
        {state.clothingItems.length === 0 ? (
          <Text style={styles.emptyText}>No clothing items yet. Add some to get started!</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {state.clothingItems.slice(0, 5).map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemCard}>
                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6366f1',
    padding: 30,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -30,
    paddingHorizontal: 20,
  },
  actionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statsContainer: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '30%',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  recentSection: {
    padding: 20,
  },
  emptyText: {
    color: 'gray',
    textAlign: 'center',
    padding: 20,
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
    width: 120,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  itemName: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});
