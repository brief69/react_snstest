import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Tweet from './Tweet';

const TweetList = ({ tweets }) => {
  const renderItem = ({ item }) => <Tweet tweet={item} />;

  return (
    <FlatList
      data={tweets}
      renderItem={renderItem}
      keyExtractor={(item) => item.id_str}
      style={styles.list}
    />
  );
};

TweetList.propTypes = {
  tweets: PropTypes.arrayOf(
    PropTypes.shape({
      id_str: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        screen_name: PropTypes.string.isRequired,
        profile_image_url: PropTypes.string.isRequired,
      }).isRequired,
      retweet_count: PropTypes.number.isRequired,
      favorite_count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
});

export default TweetList;
