import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import axios from '../axios';
import Rating from './components/Rating';

// import StarRating from 'react-native-star-rating';
const Doctor = ({route,navigation}) => {
  const [arrDate, setArrDate] = useState([]);
    const [arrSchedule, setArrSchedule] = useState([]);
    const [date, setDate] = useState(moment((new Date()).setDate((new Date()).getDate())).format("YYYY-MM-DD")); 
    const [review, setReview] = useState([]);
    const [rateDoctor, setRateDoctor] = useState(0);

    const {doctor} = route.params;
    useEffect(() => {
      (async () => {
        let getSchedule = await axios.get('/api/get-schedule-doctor-by-date?doctorId='+doctor.id+'&date='+date)
      setArrSchedule(getSchedule.data);   
      
      })();
  }, [date]);

  let getData = async () => {
    let reviewData = await axios.get('/api/get-reviews-booking?doctorId='+doctor.id)
        setReview(reviewData.data); 
        let count = 0;
        if (reviewData.data.length > 0) {
            reviewData.data.forEach((item) => {
                count += item.rate;
            })
            setRateDoctor(count / reviewData.data.length);
        } else {
            setRateDoctor("Chưa có đánh giá");
        }
  }
  useEffect(() => {
    getSelectDate();
    getData();
},[] );
let getSelectDate = () => {
    let arrDate = [];
    let date = new Date();
    let newDate = new Date(date.setDate(date.getDate() + 1));
    for (let i = 0; i < 7; i++) {
        let object = {};   
            object.label = capitalizeFirstLetter(moment(newDate).add(i, 'days').locale('vi').format('dddd - DD/MM'))
            object.value = moment(newDate).add(i, 'days').format("YYYY-MM-DD")
            object.id = i;         
            arrDate.push(object)
        setArrDate(arrDate)
    }
}
let capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  const renderScheduleItem = ({ item }) => (
    <TouchableOpacity
    key={item.id}
      style={[styles.scheduleItem, 
        // item.status === 'unavailable' &&
      
      styles.scheduleItemUnavailable]}
      // disabled={item.status === 'unavailable'}
      onPress={() => {
        console.log(`You selected ${item.timeType}`)
        navigation.navigate('BookingForm', {doctor: doctor, date: date, time: {
          timeType: item.timeType,
          timeTypeData: item.timeTypeData
        },
        name: "Đặt lịch hẹn",
      })
      }}
    >
      <Text style={styles.scheduleItemText}>
        {
          item.timeTypeData.valueVi
        }
      </Text>
    </TouchableOpacity>
  );

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}
    key={item.id}
    >
      <View style={styles.reviewHeader}>
        <Image style={styles.reviewAvatar} source={
          {
            uri: item.bookingData.patientData.userData.image
          }
        } />
        <View>
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
        >
        <Text style={styles.reviewName}>{item.bookingData.patientData.userData.lastName} {item.bookingData.patientData.userData.firstName}</Text>
        <Text style={styles.reviewDate}>{"Đã khám ngày " +  moment(item.bookingData.date).format('DD/MM/YYYY')}</Text>
        </View>
        <Rating rating={item.rate} />

        </View>
        {/* <StarRating
    disabled={true}
    maxStars={5}
    rating={item.rate}
    starSize={10}
    fullStarColor={'gold'}
    emptyStarColor={'gold'}
  /> */}
      </View>
      <Text style={styles.reviewComment}>{item.review}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={styles.headerLeft}
        >
        <Image style={styles.avatar} source={
          {
            uri: doctor.userData.image
          }
        } />
         <Text style={styles.name}>{
          doctor.userData.lastName + ' ' + doctor.userData.firstName
        }
        </Text>
        <Text style={styles.specialist}>{doctor.specialtyData.name}</Text>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Xem thông tin</Text>
        </TouchableOpacity>
        </View>
        <View>
       
        
        {/* <Text style={styles.description}>
          {doctor.description}
        </Text> */}
        <View style={{
          maxWidth: 200
        }}>
          
          <Text className="font-bold">Rate:</Text>
          <Rating rating = {3.5} />
          <Text className="font-bold">Giá khám:</Text>
          <Text>120.000đ VND</Text>
          <Text className="font-bold">
            Nơi khám:
          </Text>
          <Text>
            Bệnh viện ABC
          </Text>
          <Text className="font-bold">
            Địa chỉ: 
          </Text>
          <Text>
          123 đường ABC, quận XYZ, TP HCM
          </Text>
        </View>
        
        </View>
      </View>
      <View style={styles.schedule}>
 
               <Picker
        selectedValue={date}
        style={{ height: 50, width: 250 }}
        onValueChange={
          (e) => {
            setDate(moment(e).format("YYYY-MM-DD"))
            
          }
        }
      >
        {arrDate && arrDate.map((item, index) => {
          return (
            <Picker.Item label={item.label} value={item.value} key={item.id} />
          );
        })}
              </Picker>
        {
          arrSchedule.length > 0 ? (
            <View>
              <Text style={
                {
                  marginBottom: 10,
                  fontWeight: 'bold',
                  fontSize: 13
                }
              }>
                Bạn có thể phải cuộn qua phải để xem thêm lịch khám😊
              </Text>
              <FlatList
          data={arrSchedule}
          renderItem={renderScheduleItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
        />
            </View>
          ) : (
            <Text>Không có lịch khám</Text>
          )
        }
        
      </View>
      <View style={styles.reviews}>
        
        <Text style={styles.reviewsTitle}>Reviews:</Text>
        <FlatList
          data={review}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
          
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },
  headerLeft: {
    flex: 1,
    alignItems: 'center',
  },
  
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 40,
    textAlign: 'center',
    

  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  specialist: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 5,
   
    

  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  schedule: {
    // flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 60,
  
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  scheduleItem: {
    backgroundColor: 'orange',
    padding: 10,
    paddingVertical: 13,
    marginRight: 10,
    borderRadius: 5,
    
  },
  scheduleItemUnavailable: {
    opacity: 0.5,
  },
  scheduleItemText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  reviews: {
    flex: 1,
    padding: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewDate: {
    fontSize: 14,
    fontStyle: 'italic',

  },
  reviewItem: {
    marginBottom: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewRating: {
    color: 'green',
  },
  reviewComment: {
    fontSize: 16,
    paddingLeft: 50,
    
  },
  description: {
    width: 250,
  }
});

export default Doctor;

