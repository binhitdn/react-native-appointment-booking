import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const Rating = ({ rating }) => {
  const filledStar = require('../../../assets/rate/star.png');
  const halfStar = require('../../../assets/rate/half.png');
  const emptyStar = require('../../../assets/rate/nonstar.png');

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<Image source={filledStar} key={i} style={styles.star} />);
    }

    if (halfStars > 0) {
      stars.push(<Image source={halfStar} key={fullStars + 1} style={styles.star} />);
    }

    for (let i = fullStars + halfStars + 1; i <= 5; i++) {
      stars.push(<Image source={emptyStar} key={i} style={styles.star} />);
    }

    return stars;
  }

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      <Text style={styles.rating}>{
        rating ? rating.toFixed(1) : 'Chưa có đánh giá' 
      } / 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 5,
  },
  star: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Rating;