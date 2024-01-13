import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications } from '../utils/api'; // Assuming you have a function to fetch notifications

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); // Assuming you have user state in your Redux store

  useEffect(() => {
    setLoading(true);
    fetchNotifications(user.token) // Assuming the API function requires a user token
      .then(data => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      });
  }, [dispatch, user.token]);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading notifications...</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  notificationText: {
    fontSize: 16,
  },
});

export default NotificationScreen;
