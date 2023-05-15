import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import RenderHtml from 'react-native-render-html';


const DoctorDetailScreen = ({
  route
}) => {
  const { width } = useWindowDimensions();
  let doctor = route.params.doctor;
  useEffect(() => {
    console.log(doctor);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: doctor.userData.image,
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {doctor.userData.lastName} {doctor.userData.firstName}
          </Text>
          <Text style={styles.specialty}>
            {doctor.specialtyData.name}
          </Text>
          <Text style={styles.contact}>
            Điện thoại: {doctor.userData.phone}
          </Text>
          <Text style={styles.contact}>
            Địa chỉ: {doctor.userData.address}
          </Text>
          <View style={{ marginTop: 16 }}>
            <RenderHtml
              contentWidth={width}
              source={{ html: doctor.contentHTML }}
            />


          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    marginTop: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 18,
    color: '#999',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  contact: {
    fontSize: 16,
    color: '#999',
  },
});

export default DoctorDetailScreen;
