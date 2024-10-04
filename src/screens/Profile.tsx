// ProfileScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const userProfile = {
  id: "46149ee7-1623-479c-b867-08dce38e0606",
  name: "Prince Raghuwanshi",
  gmail: "princeraghuwanshi_cse21@ggct.co.in",
  college: "Gyan Ganga College of Technology",
  course: "B.Tech (Bachelor of Technology)",
  branch: "CSE (Computer Science and Engineering)",
  country: "India",
  admissionYear: 2021,
  passoutYear: 2025,
  profilePictureUrl: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
};

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: userProfile.profilePictureUrl }} style={styles.profilePicture} />
      <Text style={styles.name}>{userProfile.name}</Text>
      <Text style={styles.email}>{userProfile.gmail}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>College:</Text>
        <Text style={styles.detail}>{userProfile.college}</Text>

        <Text style={styles.label}>Course:</Text>
        <Text style={styles.detail}>{userProfile.course}</Text>

        <Text style={styles.label}>Branch:</Text>
        <Text style={styles.detail}>{userProfile.branch}</Text>

        <Text style={styles.label}>Country:</Text>
        <Text style={styles.detail}>{userProfile.country}</Text>

        <Text style={styles.label}>Admission Year:</Text>
        <Text style={styles.detail}>{userProfile.admissionYear}</Text>

        <Text style={styles.label}>Passout Year:</Text>
        <Text style={styles.detail}>{userProfile.passoutYear}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    color: '#333',
  },
});

export default Profile;
