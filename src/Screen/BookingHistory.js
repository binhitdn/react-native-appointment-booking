import { Image } from '@rneui/base';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import { handleChangeStatusBookingApi } from '../services/bookingService';



const BookingHistory = ({ route, navigation }) => {
  const { item } = route.params;




  return (
    <View style={styles.container}>
      <View style={styles.doctor}>
        <View style={styles.avatarContainer}>
          <Image source={
            { uri: item.doctorData.userData.image }
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
      <TouchableOpacity style={styles.button}
        onPress={() =>
          Alert.alert(
            "Hủy lịch hẹn",
            "Bạn có chắc chắn muốn hủy lịch hẹn này không?",
            [
              {
                text: "Hủy",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: "Đồng ý", onPress: () => {
                  (async () => {
                    await handleChangeStatusBookingApi(item.id, "S4");
                    navigation.navigate("Home");
                  })();
                }
              }
            ],
            { cancelable: false }
          )
        }
      >
        <Text style={styles.buttonText}>Hủy lịch hẹn</Text>
      </TouchableOpacity>
      <LottieView
        source={{
          uri: 'https://assets10.lottiefiles.com/packages/lf20_fxvz0c.json',
        }}
        autoPlay
        loop={true}
        speed={0.5}
        style={{
          width: 300,
          height: 300,
          alignSelf: 'center',
        }}
      />
      <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 20, fontWeight: 'bold', color: '#f44336' }}>
        Hãy chờ đợi bác sĩ duyệt lịch hẹn của bạn
      </Text>
      <TouchableOpacity style={styles.chat}
        onPress={() => navigation.navigate("ChatDoctor", {
          name: "Chat với bác sĩ",
          doctorData: item.doctorData,
        })}

      >
        {/* 
         */}
        <Text>Chat với bác sĩ</Text>
      </TouchableOpacity>
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
  chat: {
    backgroundColor: 'blue',
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },

});

export default BookingHistory;
