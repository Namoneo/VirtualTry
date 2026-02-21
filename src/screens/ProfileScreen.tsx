import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useApp } from '../context/AppContext';

export default function ProfileScreen({ navigation }: any) {
  const { state } = useApp();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {state.user?.name?.[0] || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{state.user?.name || 'User'}</Text>
        <Text style={styles.userEmail}>{state.user?.email || 'No email set'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Body Profiles</Text>
        {state.bodyProfiles.map((profile) => (
          <TouchableOpacity key={profile.id} style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileMeasurements}>
                {profile.height}cm • {profile.weight}kg
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={styles.addProfileButton}
          onPress={() => navigation.navigate('AddBodyProfile')}
        >
          <Text style={styles.addProfileText}>+ Add Body Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text>Help & Support</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  profileCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  profileInfo: {},
  profileName: {
    fontSize: 16,
    fontWeight: '600',
  },
  profileMeasurements: {
    color: 'gray',
    marginTop: 5,
  },
  addProfileButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
    borderStyle: 'dashed',
  },
  addProfileText: {
    color: '#6366f1',
    fontWeight: '600',
  },
  settingItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});
