import { Image } from '@rneui/base';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';



const BookingHistory = ({route}) => {
  const {item} = route.params;
  
  const [doctor, setDoctor] = useState({
    name: 'Nguyễn Văn A',
    specialization: 'Chuyên khoa nội tiết',
    avatar: "https://i.pinimg.com/474x/3d/b7/9e/3db79e59b9052890ea1ffbef0f3970cc.jpg",
  });
  

  
  

  const [date, setDate] = useState('27/02/2023');
  const [time, setTime] = useState('9:00 AM');
  const [location, setLocation] = useState('Bệnh viện Đa khoa TPHCM');
 

  return (
    <View style={styles.container}>
      <View style={styles.doctor}>
        <View style={styles.avatarContainer}>
          <Image source={
            {uri: item.doctorData.userData.image}
          } style={styles.avatar} />
        </View>
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>
                {
                  item.doctorData.userData.lastName + " " + item.doctorData.userData.firstName
                }  
          </Text>
          <Text style={styles.doctorSpecialization}>
            Chuyên khoa:
                {
                  item.doctorData.specialtyData.name
                }
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ngày khám:</Text>
        <Text style={styles.value}>
          {moment(item.date).format("DD-MM-YYYY")}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Giờ khám:</Text>
        <Text style={styles.value}>
          {item.timeTypeData2.valueEn}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Địa điểm:</Text>
        <Text style={styles.value}>
          {item.doctorData.addressClinic}
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Hủy lịch hẹn</Text>
      </TouchableOpacity>
      <LottieView
        source={{
          uri: 'https://assets10.lottiefiles.com/packages/lf20_fxvz0c.json',
        }}
        autoPlay
        loop={false}
        speed={0.5}
        style={{
          width: 300,
          height: 300,
          alignSelf: 'center',
        }}
      /> 
      <Text style={{textAlign: 'center', marginTop: 20, fontSize: 20, fontWeight: 'bold', color: '#f44336'}}>
        Hãy đến đúng giờ khám bệnh nhé!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  doctor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  doctorSpecialization: {
    fontSize: 16,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
    color: '#666',
  },
  value: {
    flex: 1,
  },
  button: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookingHistory;
