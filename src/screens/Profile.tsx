// ProfileScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import useAuthService from '../services/authService';
import { UserInfo } from '../interfaces/user';
import { ApiResponse } from '../interfaces/response';
import Loading from './Loading';
import NoContent from './NoContent';
import { Role } from '../interfaces/enums';
import { useNavigation } from '@react-navigation/native';

type ProfileProps = {
  route: any;
};

const Profile = ({ route }: ProfileProps) => {
  const userService = useAuthService();
  const { id, role } = route.params;
  const navigation = useNavigation();
  
  const [user, setUser] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Profile");
  useEffect(() => {
    (async () => {
      try {
        console.log("Inside useEffect");
        console.log("Role : ", role)
        var data : ApiResponse<UserInfo>;
        if(role == Role.Student){
          data = await userService.getUserById(id);
          
        }else{
          console.log("Faculty")
          data = await userService.getFacultyById(id);
        }
        
        console.log("Data: ", data);
          if (data.success) {
            setUser(data.data);
            setTitle(data.data.name);
            navigation.setOptions({
              headerTitle : title
            })
          }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
    
  }, [id, title]);

  if (loading) {
    return <Loading />;
  } else if (!user) {
    return <NoContent />;
  }
  
  return (
    <ScrollView>
      <View style={styles.container}>
      <Image source={{ uri: user.profilePictureUrl }} style={styles.profilePicture} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.gmail}</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>College:</Text>
        <Text style={styles.detail}>{user.college}</Text>

        <Text style={styles.label}>Course:</Text>
        <Text style={styles.detail}>{user.course}</Text>

        <Text style={styles.label}>Branch:</Text>
        <Text style={styles.detail}>{user.branch}</Text>

        <Text style={styles.label}>Country:</Text>
        <Text style={styles.detail}>{user.country}</Text>

        <Text style={styles.label}>State:</Text>
        <Text style={styles.detail}>{user.state}</Text>

        <Text style={styles.label}>City:</Text>
        <Text style={styles.detail}>{user.city}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.detail}>{user.address}</Text>

        <Text style={styles.label}>Contact Number:</Text>
        <Text style={styles.detail}>{user.contactNumber}</Text>

        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.detail}>{user.bio}</Text>

        <Text style={styles.label}>Admission Year:</Text>
        <Text style={styles.detail}>{user.admissionYear}</Text>

        <Text style={styles.label}>Passout Year:</Text>
        <Text style={styles.detail}>{user.passoutYear}</Text>
      </View>
    </View>
    </ScrollView>
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
