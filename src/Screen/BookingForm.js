import moment from 'moment/moment';
import React, { useContext, useState } from 'react';
import {getPatientIdByUserIdApi} from "../services/userService"
import {handleBookingApi} from "../services/bookingService"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Authorization } from '../context/Authorization';
//Cần Edit
const BookingForm = ({route,navigation}) => {
  const {doctor,date,time} = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const {user} = useContext(Authorization);


  let getData = async () => {
  }


  const handleSubmit = () => {
    handleBookingSuccess(date,time,reason);

    
  }
  let handleBookingSuccess = async (date,timeType,reason) => {
    let patientIdData = await getPatientIdByUserIdApi(handleAuth().id);
    
    let data = {
        doctorId: doctor.id,
        patientId: user.id,
        date: moment(date).format("YYYY-MM-DD"),
        timeType: time.timeType, //coi lại
        reason: reason
    };
    let res = await handleBookingApi(data);
    navigation.navigate("BookingSuccess");
}

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Image source={
          { uri: doctor.userData.image }
        } style={styles.doctorImage} />
        {/* <Text style={styles.BookingTitle} className="bg-lime-400 rounded-lg pl-2 pr-2">
          Đặt lịch hẹn với bác sĩ 
        </Text> */}
        <Text className=" text-xl font-bold text-gray-800">
        {doctor.userData.lastName + ' ' + doctor.userData.firstName}
        </Text>
        <View>
        <Text className=" text-lg font-bold text-gray-800
        ">
          Chuyên khoa {doctor.specialtyData.name}
        </Text>
        </View>
        <Text
        className=" text-lg font-bold text-gray-800"
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: 'orange',
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 10,
          color: 'white',
        }}
        >
          Thời gian: {time.timeTypeData.valueVi}  {moment(date).format('DD/MM/YYYY')}
        </Text>
        <Text style={{
          fontSize: 20,
        }}>
          Giá: {doctor.priceId}
        </Text>
        
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
         
        }}
        >
        <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 10,
          marginBottom: 10,
        }}
        >Họ và tên: </Text>
        <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 10,
          marginBottom: 10,
        }}
        >{user.lastName + ' ' + user.firstName}</Text>
        </View>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
        <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 10,
          marginBottom: 10,
        }}
        >Email: </Text>
        <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 10,
          marginBottom: 10,
        }}
        >{user.email}</Text>
        </View>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
        <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 10,
          marginBottom: 10,
        }}
        >Số điện thoại: </Text>
        <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 10,
          marginBottom: 10,
        }}
        >{user.phone}</Text>
        </View>
        <Text style={styles.label}>LÍ DO KHÁM</Text>
        <TextInput
          style={[styles.input, styles.reasonInput]}
          onChangeText={setReason}
          value={reason}
          placeholder="Nhập lí do khám"
          multiline
          textAlignVertical="top"
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>ĐẶT LỊCH KHÁM</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(234, 223, 249)',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginTop: 30,
    marginBottom: 20,
  },
  BookingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  reasonInput: {
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default BookingForm;
