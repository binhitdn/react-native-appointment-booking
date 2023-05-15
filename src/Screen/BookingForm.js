import moment from 'moment/moment';
import React, { useContext, useState } from 'react';
import { getPatientIdByUserIdApi } from "../services/userService"
import { handleBookingApi } from "../services/bookingService"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { Authorization } from '../context/Authorization';
import LottieView from 'lottie-react-native';
import formatCurrencyVND from '../component/formatCurrencyVND';
//Cần Edit


const BookingForm = ({ route, navigation }) => {
  const { doctor, date, time } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const { user } = useContext(Authorization);


  let getData = async () => {
  }


  const handleSubmit = () => {
    Alert.alert(
      "Xác nhận đặt lịch",
      "Bạn có chắc chắn muốn đặt lịch?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Đồng ý", onPress: async () => {
            handleBookingSuccess(date, time, reason);
          }
        }

      ]);








  }
  let handleBookingSuccess = async (date, timeType, reason) => {

    let patientIdData = await getPatientIdByUserIdApi(user.id);

    let data = {
      doctorId: doctor.id,
      patientId: patientIdData.data,
      date: moment(date).format("YYYY-MM-DD"),
      timeType: timeType.timeTypeData.keyMap,
      reason: reason

    };
    console.log("Success: ", data);
    try {
      let res = await handleBookingApi(data);
      console.log("res: ", res);
    } catch (error) {
      console.log(error)
    }


    navigation.navigate("BookingSuccess");
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.doctorInfo}>

          <Image source={
            { uri: doctor.userData.image }
          } style={styles.doctorImage} />
          <View
            className="pl-5"
          >
            <Text className=" text-xl font-bold text-gray-800">
              {doctor.userData.lastName + ' ' + doctor.userData.firstName}
            </Text>
            <Text className=" text-sm font-bold text-gray-800
        ">
              Chuyên khoa {doctor.specialtyData.name}
            </Text>
          </View>

        </View>


        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <LottieView
            source={require('../../assets/lottie/Time.json')}
            autoPlay
            loop={true}
            speed={0.5}
            style={{ width: 50, height: 50 }}
          />
          <Text
            className=" text-lg font-bold text-gray-800"
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 10,
              marginBottom: 10,

              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 10,

            }}
          >
            Thời gian: {time.timeTypeData.valueVi} -

            {moment(date).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <LottieView
            source={require('../../assets/lottie/Price.json')}
            autoPlay
            loop={true}
            speed={0.5}
            style={{ width: 50, height: 50 }}
          />
          <Text style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
            Giá: {doctor.priceId}

          </Text>
        </View>
        <Text style={styles.label}>LÍ DO KHÁM</Text>
        <TextInput
          style={[styles.input, styles.reasonInput]}
          onChangeText={setReason}
          value={reason}
          placeholder="Nhập lí do khám"
          multiline
          textAlignVertical="top"
          numberOfLines={3}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>ĐẶT LỊCH KHÁM</Text>
        </TouchableOpacity>
        <LottieView
          source={{
            uri: 'https://assets10.lottiefiles.com/packages/lf20_qq6gioyz.json',
          }}
          autoPlay
          loop={false}
          speed={0.5}
          style={{
            width: 250,
            height: 250,
            alignSelf: 'center',
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

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
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default BookingForm;
