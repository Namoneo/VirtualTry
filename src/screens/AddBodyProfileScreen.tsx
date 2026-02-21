import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';

export default function AddBodyProfileScreen({ navigation }: any) {
  const { dispatch } = useApp();
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');

  const handleSave = () => {
    const newProfile = {
      id: Date.now().toString(),
      userId: 'default',
      name,
      height: parseFloat(height) || 0,
      weight: parseFloat(weight) || 0,
      chest: parseFloat(chest) || 0,
      waist: parseFloat(waist) || 0,
      hips: parseFloat(hips) || 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    dispatch({ type: 'ADD_BODY_PROFILE', payload: newProfile });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Profile Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g., My Regular Fit"
        />

        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="e.g., 175"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="e.g., 70"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Chest (cm)</Text>
        <TextInput
          style={styles.input}
          value={chest}
          onChangeText={setChest}
          placeholder="e.g., 100"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Waist (cm)</Text>
        <TextInput
          style={styles.input}
          value={waist}
          onChangeText={setWaist}
          placeholder="e.g., 80"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Hips (cm)</Text>
        <TextInput
          style={styles.input}
          value={hips}
          onChangeText={setHips}
          placeholder="e.g., 95"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  form: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  saveButton: { backgroundColor: '#6366f1', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
