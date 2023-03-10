
  
  

  import React, { useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';


var screenWidth = Dimensions.get('window').width;


const SliderNe = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    


  const flatListRef = useRef(null);
  

  const specialties = [
    {
      id: 1,
      name: 'Phẫu thuật',
      image: 'https://i.imgur.com/5JQzQkN.jpg',
    },
    {
      id: 2,
      name: 'Nhi khoa',
      image: 'https://i.imgur.com/lWYDnBl.jpg',
    },
    {
      id: 3,
      name: 'Tim mạch',
      image: 'https://i.imgur.com/QZgHDqc.jpg',
    },
    {
      id: 4,
      name: 'Da liễu',
      image: 'https://i.imgur.com/nSDaEiJ.jpg',
    },
    {
      id: 5,
      name: 'Răng hàm mặt',
      image: 'https://i.imgur.com/t8GmPOF.jpg',
    },
    {
      id: 6,
      name: 'Y tế công cộng',
      image: 'https://i.imgur.com/mgFncUr.jpg',
    },
    {
      id: 7,
      name: 'Tiêu hóa',
      image: 'https://i.imgur.com/9FFOr7O.jpg',
    },
    {
      id: 8,
      name: 'Sản khoa',
      image: 'https://i.imgur.com/tdpFWGu.jpg',
    },
    {
      id: 9,
      name: 'Tai mũi họng',
      image: 'https://i.imgur.com/dUZjKwr.jpg',
    },
    {
      id: 10,
      name: 'Thần kinhg',
      image: 'https://i.imgur.com/3b2IZYf.jpg',
    },
  ];

  const handleNext = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: (index + 1) % specialties.length,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.specialtySlider}>
  <FlatList
    data={specialties}
    horizontal
    showsHorizontalScrollIndicator={false}
    pagingEnabled
    onMomentumScrollEnd={(event) => {
      const slideWidth = event.nativeEvent.layoutMeasurement.width;
      const currentIndex = Math.floor(
        event.nativeEvent.contentOffset.x / slideWidth
      );
      setCurrentIndex(currentIndex);
    }}
    renderItem={({ item, index }) => (
      <View style={styles.specialtyContainer}>
        <Image source={item.image} style={styles.specialtyImage} />
        <Text style={styles.specialtyTitle}>{item.title}</Text>
      </View>
    )}
    keyExtractor={(item, index) => index.toString()}
    ref={flatListRef}
  />
  <View style={styles.pagination}>
    {specialties.map((_, index) => (
      <View
        key={index.toString()}
        style={[
          styles.dot,
          index === currentIndex ? styles.activeDot : null,
        ]}
      />
    ))}
  </View>
</View>



  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 200,
  },
  slide: {
    width: screenWidth,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideImage: {
    width: screenWidth,
    height: 200,
    position: 'absolute',
  },
  slideTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
  },
  slideText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  nextButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SliderNe;
