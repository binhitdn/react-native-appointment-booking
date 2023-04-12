import servicedata from '../services/servicedata';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

const styles = {
  slide1: {
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  wrapper: {
    height: 200,
  },
};

const SliderService = () => {
  return (
    <Swiper loop={true} showsButtons style={styles.wrapper} autoplay={true} autoplayTimeout={2.5}
      activeDotColor="white"
      dotColor="orangered"

    >

      {servicedata.map((item, index) => {
        return (
          <ImageBackground source={{ uri: item.image }} style={styles.slide1} key={index}>


          </ImageBackground>

        );
      })
      }

    </Swiper>
  );
};

export default SliderService;
