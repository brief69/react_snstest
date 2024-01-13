import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import TweetList from '../components/TweetList';
import api from '../utils/api';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const user = useSelector((state) => state.user); // Assuming there's a user slice in the Redux store

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await api.get(`/users/${user.id}`); // Replace with actual API endpoint
        const tweetsResponse = await api.get(`/users/${user.id}/tweets`); // Replace with actual API endpoint
        setProfile(profileResponse.data);
        setTweets(tweetsResponse.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, [user.id]);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profile.profile_image_url }} style={styles.profileImage} />
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileHandle}>@{profile.screen_name}</Text>
      </View>
      <TweetList tweets={tweets} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileHandle: {
    fontSize: 16,
    color: '#657786',
  },
});

export default ProfileScreen;
