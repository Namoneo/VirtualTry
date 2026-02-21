import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { ClothingItem } from '../types';

export default function CameraScreen() {
  const { state } = useApp();
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [showClothingModal, setShowClothingModal] = useState(false);

  if (!permission) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need camera access to let you try on clothes virtually</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    setIsCapturing(true);
    // In a real app, this would capture the photo
    // For now, we'll simulate
    setTimeout(() => {
      setIsCapturing(false);
      setCapturedPhoto('https://via.placeholder.com/300x500');
    }, 1000);
  };

  const selectClothing = (item: ClothingItem) => {
    setSelectedItem(item);
    setShowClothingModal(false);
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <View style={styles.overlay}>
          {/* Selected clothing preview */}
          {selectedItem && (
            <View style={styles.clothingPreview}>
              <Image 
                source={{ uri: selectedItem.imageUrl }} 
                style={styles.clothingImage}
                resizeMode="contain"
              />
            </View>
          )}
        </View>

        {/* Camera controls */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.galleryButton}
            onPress={() => setShowClothingModal(true)}
          >
            <Ionicons name="shirt-outline" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.captureButton}
            onPress={takePhoto}
            disabled={isCapturing}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchButton}
            onPress={() => {}}
          >
            <Ionicons name="refresh" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* Clothing selection modal */}
      <Modal visible={showClothingModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Clothing</Text>
            <TouchableOpacity onPress={() => setShowClothingModal(false)}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          {state.clothingItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No clothing items yet</Text>
              <Text style={styles.emptySubtext}>Add clothes from the Wardrobe tab</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.clothingGrid}>
              {state.clothingItems.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.clothingItem}
                  onPress={() => selectClothing(item)}
                >
                  <Image 
                    source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }} 
                    style={styles.clothingThumb}
                  />
                  <Text style={styles.clothingName} numberOfLines={1}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  permissionButton: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 10,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clothingPreview: {
    position: 'absolute',
    top: 50,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
  },
  clothingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
  },
  galleryButton: {
    padding: 10,
  },
  switchButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
  },
  emptySubtext: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  clothingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  clothingItem: {
    width: '48%',
    margin: '1%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  clothingThumb: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  clothingName: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});
