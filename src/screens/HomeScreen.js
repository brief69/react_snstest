import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import TweetList from '../components/TweetList';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const HomeScreen = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await api.get('/tweets');
        setTweets(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />
      {loading ? (
        <ActivityIndicator size="large" color="#1DA1F2" />
      ) : (
        <TweetList tweets={tweets} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e8ed',
  },
});

export default HomeScreen;
