import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';

export default function OutfitsScreen({ navigation }: any) {
  const { state } = useApp();

  return (
    <View style={styles.container}>
      <FlatList
        data={state.outfits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.outfitCard}>
            <Text style={styles.outfitName}>{item.name}</Text>
            <Text style={styles.outfitCount}>{item.items.length} items</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No outfits created yet</Text>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Create Outfit</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  outfitCard: {
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 12,
  },
  outfitName: {
    fontSize: 18,
    fontWeight: '600',
  },
  outfitCount: {
    color: 'gray',
    marginTop: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  createButton: {
    marginTop: 20,
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  createButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
