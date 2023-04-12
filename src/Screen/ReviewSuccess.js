
      import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Rating, Input, Button } from 'react-native-elements';
import LottieView from 'lottie-react-native';

const ReviewSuccess = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
 
  const handleRating = (value) => {
    setRating(value);
  };

  const handleComment = (value) => {
    setComment(value);
  };

  const handleSave = () => {
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    // Lưu đánh giá vào database hoặc gửi lên server
    // Sau đó có thể hiển thị thông báo cho người dùng
    alert('Đã lưu đánh giá của bạn');
  };

  return (
    <View 
    style={{
      backgroundColor: 'rgb(249, 244, 255)',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}

    >
       <LottieView
        source={require('../../assets/lottie/ReviewS.json')}
        autoPlay
        loop={true}
        speed={0.5}
        style={{
          width: 400,
          height: 400,
          alignSelf: 'center',
        }}
      /> 
      <LottieView
        source={require('../../assets/lottie/ReviewS2.json')}
        autoPlay
        loop={true}
        speed={0.5}
        style={{
          width: 500,
          height: 150,
          alignSelf: 'center',
        }}
      /> 
      
      <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
      }}
      >
        <Text style={{ fontSize: 25, fontWeight: 'bold',
      padding: 10, 
      }}>
          Cảm ơn bạn đã đánh giá
        </Text>
        <Text style={{ fontSize: 16, color: 'gray' }}>
          Đánh giá của bạn sẽ giúp chúng tôi cải thiện dịch vụ
        </Text>
        <TouchableOpacity 
        style={{
          backgroundColor: 'rgb(253, 220, 100)',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => navigation.navigate('Home')}
        >
          <Text style={{ fontSize: 16, color: 'blue' }}>
            Về trang chủ
          </Text>
        </TouchableOpacity>
      </View>
      
     
    </View>
  );
};

export default ReviewSuccess;
