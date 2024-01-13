import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Tweet = ({ tweet }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: tweet.user.profile_image_url }} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{tweet.user.name}</Text>
          <Text style={styles.handle}>@{tweet.user.screen_name}</Text>
        </View>
        <Text style={styles.body}>{tweet.text}</Text>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.iconContainer}>
            {/* Icons can be added using libraries like react-native-vector-icons */}
            <Text style={styles.iconText}>{tweet.retweet_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Text style={styles.iconText}>{tweet.favorite_count}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      screen_name: PropTypes.string.isRequired,
      profile_image_url: PropTypes.string.isRequired,
    }).isRequired,
    retweet_count: PropTypes.number.isRequired,
    favorite_count: PropTypes.number.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  handle: {
    marginLeft: 5,
    color: '#657786',
  },
  body: {
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    marginLeft: 5,
    color: '#657786',
  },
});

export default Tweet;
