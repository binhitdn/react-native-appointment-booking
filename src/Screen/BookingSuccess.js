import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const BookingSuccess = ({ navigation, route }) => {
  let appointmentDate = "12/12/2021";
    let appointmentTime = "12:00 PM";
    let appointmentDoctor = "Nguyễn Văn A";
    let appointmentAddress = "Hòa Khánh Nam, Liên Chiểu, Đà Nẵng";

  return (
    <View style={styles.container}>
      <Image source={
        require('../../assets/imgapp/succcess.gif')
      } style={styles.image} />
      <Text style={styles.title}>
        Cuộc hẹn của bạn đã được đặt
      </Text>
      {/* <Text style={styles.text}>
        Hãy đến đúng vào lúc {appointmentTime} ngày {appointmentDate} 
        tại {appointmentAddress} để được khám bệnh bởi bác sĩ {appointmentDoctor}
      </Text> */}
      <Text
        style={ styles.text }
        >
            Hãy chờ sự xác nhận từ bác sĩ nhé!
        </Text>
      <Text style={styles.text}>
        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
    </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>
            Trở về trang chủ
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: "150%",
    height: 400,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2196F3',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    color: '#333',
    
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingSuccess;
