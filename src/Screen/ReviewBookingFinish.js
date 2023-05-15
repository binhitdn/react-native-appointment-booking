import { Icon } from '@rneui/base';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { handleEditReviewApi, handleCreateNewReviewApi } from '../services/doctorService';
import { Ionicons } from '@expo/vector-icons';



export default function DoctorReview({
  navigation,
  route
}) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [advice, setAdvice] = useState('');
  const [isRating, setIsRating] = useState(false);
  const item = route.params.item;

  const colors = {
    orange: '#FFBA5A',
    dark: '#1E1F20',
    primary: 'rgb(152, 255, 73)',
    text: '#fff',
    subText: '#FEF9F8',
  };

  let handleSaveReview = async () => {
    let data = {
      bookingId: id,
      rate: rating,
      review: comment,
    }
    let a = await handleCreateNewReviewApi(data);





  }
  let handleEditReview = async () => {
    let data = {
      bookingId: id,
      rate: rating,
      review: comment,
    }
    let a = await handleEditReviewApi(data);

    console.log(
      "data" + JSON.stringify(data)
    );
    console.log(
      "a" + JSON.stringify(a)
    );
    console.log(
      "rating" + JSON.stringify(rating)
    );


  }


  useEffect(() => {
    setId(item.id);
    setName(item.doctorData.userData.lastName + " " + item.doctorData.userData.firstName);
    setPrice(item.doctorData.priceId);
    setAppointmentTime(item.timeTypeData2.valueVi + "  " + moment(item.date).format("DD-MM-YYYY"));
    setReason(item.reason);
    setDiagnosis(item.bookingfinishData.diagnose);
    setPrescription(item.bookingfinishData.medicine);
    setAdvice(item.bookingfinishData.note);
    setComment(item.reviewerBookingData.review);
    setRating(item.reviewerBookingData.rate);
    setIsRating(
      item.reviewerBookingData.rate > 0
    );

  }, [item]);


  const handleSubmit = () => {
    if (isRating) {
      handleEditReview();
    } else {
      handleSaveReview();
    }
    navigation.navigate('ReviewSuccess');
  }
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <View style={styles.container}>
      <View style={styles.doctorInfoContainer}>
        <Image
          source={{ uri: item.doctorData.userData.image }}
          style={styles.doctorAvatar}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>
            {item.doctorData.userData.lastName + " " + item.doctorData.userData.firstName}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="ios-star" size={20} color="#FFD700" />
            <Text style={styles.doctorSpecialty}>
              Chuyên Khoa
              {" " + item.doctorData.specialtyData.name}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Ionicons name="ios-cash" size={20} color={colors.orange} />
            <Text style={
              {
                fontSize: 13,
                fontWeight: 'bold',
                color: 'black',
                marginRight: 10,
              }
            }>Giá khám: {
                formatCurrency(item.doctorData.priceId)
              }
              VNĐ</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="ios-time" size={20} color={colors.orange} />
            <Text style={
              {
                fontSize: 13,
                fontWeight: 'bold',
                color: 'black',
                marginRight: 10,
              }
            }>
              {
                item.timeTypeData2.valueVi + "  " + moment(item.date).format("DD-MM-YYYY")
              }



            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name="ios-chatbubbles" size={20} color={colors.orange} />
          <View>
            <Text style={styles.label}>Lí do khám:</Text>
            <Text style={styles.value}>
              {item.reason}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name="ios-chatbubbles" size={20} color={colors.orange} />
          <View>
            <Text style={styles.label}>Chuẩn đoán:</Text>
            <Text style={styles.value}>
              {item.bookingfinishData.diagnose}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name="ios-chatbubbles" size={20} color={colors.orange} />
          <View>
            <Text style={styles.label}>Đơn thuốc đề xuất:</Text>
            <Text style={styles.value}>
              {item.bookingfinishData.medicine}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name="ios-chatbubbles" size={20} color={colors.orange} />
          <Text style={styles.label}>Lời khuyên:</Text>
          <Text style={styles.value}>
            {item.bookingfinishData.note}
          </Text>
        </View>

      </View>
      <Text style={styles.title}>Đánh giá bác sĩ</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhận xét"
        multiline={true}
        numberOfLines={4}
        value={comment}
        onChangeText={
          (text) => setComment(text)
        }
      />
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Đánh giá:</Text>
        <View style={styles.ratingStars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              style={styles.starButton}
              onPress={() => setRating(star)}
            >
              <Icon
                name="star"
                size={30}
                color={star <= rating ? '#FFD700' : '#CCCCCC'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Button
        title={
          isRating ? 'Cập nhật đánh giá' : 'Đánh giá bác sĩ'
        }
        onPress={handleSubmit}
        style={
          isRating ? styles.buttonUpdate : styles.buttonSubmit
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginRight: 8,
  },
  ratingStars: {
    flexDirection: 'row',
  },
  starButton: {
    marginHorizontal: 4,
  },
  doctorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 30,
    marginRight: 16,
    border: '1px solid #CCCCCC',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'green',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#44444',
    fontWeight: '500',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonUpdate: {
    backgroundColor: 'green',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  buttonSubmit: {
    backgroundColor: '#FFD700',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
});

