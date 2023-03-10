import moment from 'moment/moment';
import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, SegmentedButtons } from 'react-native-paper';
import axios from '../axios';
import { Authorization } from '../context/Authorization';
import NotData from './NotData';

const ScheduleScreen = ({navigation,route}) => {
  const [value, setValue] = React.useState('history');
  const {user} = React.useContext(Authorization);
  const [bookingFinished, setBookingFinished] = React.useState([]);
  const [bookingHistory, setBookingHistory] = React.useState([]);

  let getData = async () => {
    let res = await  axios.get(`/api/get-all-booking-finished?patientId=${user.id}`)
    let data2 =res.filter((item) => {
      return item.statusID === "S3";
  })
    setBookingFinished(data2);
    let res2 = await  axios.get(`/api/get-booking-for-patient?patientId=${user.id}` )
    let data =res2.filter((item) => {
      return item.statusID !== "S3";
  })
    setBookingHistory(data);


  };
  React.useEffect(() => {
    getData();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={{ 
          marginHorizontal: 10,
          marginTop: 20,
          height: 40,
          
        }}
        buttons={[
          {
            value: 'history',
            label: 'Chưa hoàn tất',
          },
          {
            value: 'finished',
            label: 'Hoàn tất',
          },
         
        ]}
      />
      {
        value === 'history' ? (
          <View className="flex flex-col justify-center items-center mt-3 
          ">
        {bookingHistory && bookingHistory.length > 0 ?
          bookingHistory.map((item) => {
            return (
              <TouchableOpacity className="flex flex-row justify-between items-center mh-2 border-b	 border-gray-300 w-96 rounded-sm overflow-hidden p-2 bg-white shadow-md"
              key = {item.id} 
              onPress={() => {
                navigation.navigate("BookingHistory",
                {
                  item: item
                })
              }
              }

              >
            <View className="flex flex-row justify-center items-center">
            <Avatar.Image
              size={40}
              source={{
                
                uri: item.doctorData.userData.image
              }}
            />
            <View className="flex flex-col justify-center items-center ml-1">
              <Text className="flex flex-row justify-center items-center font-bold">
              {item.doctorData.userData.lastName} {item.doctorData.userData.firstName}
              </Text>
              <Text className="flex flex-row justify-center items-center font-1xl">
              {item.doctorData.specialtyData.name}
              </Text>
            </View>
            </View>
            <View
            style={{
              backgroundColor: item.statusData.valueVi === "Đã hủy" ? "#FF0000" : "#00FF00",
              color: item.statusData.color === "#FF0000" ? "#FFFFFF" : "#000000",
              borderRadius: 8,
              padding: 5,
            }}
            >
              <Text className="flex flex-row justify-center items-center  font-bold"
              style={{
               
                color: item.statusData.color === "#FF0000" ? "#FFFFFF" : "#000000"
              }}
              >
               {/* {
                item.reviewerBookingData.id  ? "Đã đánh giá" : "Chưa đánh giá"
               } */}
               {
                item.statusData.valueVi
               }
              
              </Text>
              

            </View>
            <View>
              <Text className="flex flex-row justify-center items-center bg-green-500 rounded-xl p-1 font-bold text-white text-xs">
              {/* {item.timeTypeData2.valueEn}  */}
              {moment(item.date).format("DD-MM-YYYY")}
              </Text>
            </View>
           
        </TouchableOpacity>
            )
          }
          ) : (
            <NotData message="You don't have an appointment yet" />
          )
        }
      </View>
        ) : (
          <View className="flex flex-col justify-center items-center mt-3 ">
        {bookingFinished &&
          bookingFinished.map((item) => {
            return (
              <TouchableOpacity className="flex flex-row justify-between items-center mh-2 border-b	 border-gray-300 w-96 rounded-sm overflow-hidden p-2 bg-white shadow-md" 
              key={item.id}
              onPress={() => {
                navigation.navigate("ReviewBookingFinish",
                {
                  item: item
                }
                );
              }
              }
              
              >
            <View className="flex flex-row justify-center items-center">
            <Avatar.Image
              size={40}
              source={{
                
                uri: item.doctorData.userData.image
              }}
            />
            <View className="flex flex-col justify-center items-center ml-1">
              <Text className="flex flex-row justify-center items-center font-bold">
              {item.doctorData.userData.lastName} {item.doctorData.userData.firstName}
              </Text>
              <Text className="flex flex-row justify-center items-center font-1xl">
              {item.doctorData.specialtyData.name}
              </Text>
            </View>
            </View>
            <View>
              <Text className="flex flex-row justify-center items-center  font-bold text-green-500"
              >
               {
                item.reviewerBookingData.id  ? "Đã đánh giá" : "Chưa đánh giá"
               }
              
              </Text>
              

            </View>
            <View>
              <Text className="flex flex-row justify-center items-center bg-green-500 rounded-xl p-1 font-bold text-white text-xs">
              {/* {item.timeTypeData2.valueEn}  */}
              {moment(item.date).format("DD-MM-YYYY")}
              </Text>
            </View>
           
        </TouchableOpacity>
            )
          }
          )
        }
      </View>
        )
      }

            
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ScheduleScreen;