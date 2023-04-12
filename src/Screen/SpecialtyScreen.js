
import RenderHtml from 'react-native-render-html'
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Authorization } from '../context/Authorization';
import axios from "../axios";
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { FlatList } from 'react-native';



const SpecialtyScreen = ({ navigation, route }) => {
      const { item } = route.params;
    const { width } = useWindowDimensions();
  const [selectedLocation, setSelectedLocation] = useState('All');
      const [readMore, setReadMore] = useState(false);
          const [specialty, setSpecialty] = useState([]);
    const [specialtyId, setSpecialtyId] = useState([]);
    const [name, setName] = useState([]);
    const [contentHTML, setContentHTML] = useState([]);
    const [image, setImage] = useState([]);
    const [isHiddenDescription, setIsHiddenDescription] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [province, setProvince] = useState([]);
    const [arrDate, setArrDate] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState("PRO0");
    const {user , setUser} = useContext(Authorization);


        let getData = async () => {
        setSpecialtyId(item.id);
        let data = await axios.get(`/api/get-speciality-by-id?id=${item.id}`);
        setContentHTML(data.message.contentHTML);
        setName(data.message.name);
        setImage(data.message.image);
        setSpecialty(data.message);
        let doctors = await axios.get(`/api/get-detail-doctor-by-specialty?id=${item.id}`)
        setDoctors(doctors.data);
        
        
        let getAllProvince = await axios.get("/api/allcode?type=PROVINCE" );
        
        setProvince(getAllProvince.data.data)
        ;
        
    }
    useEffect(() => {
        getData();
    }, []);
  const filteredDoctors = selectedLocation === 'Toàn quốc' ? doctors : doctors.filter(doctor => doctor.provinceData.valueVi == selectedLocation);

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: item.image }} 
            style={{width: '100%', height: '100%', resizeMode: 'cover',opacity: 1,backgroundColor: 'rgba(0,0,0,0.5)'}}
              > 
                          <LinearGradient colors={['rgba(255, 255, 255, 0.688)', 'rgba(255, 255, 255, 0.737)', 'rgba(255, 255, 255, 0.726)']} style={{
               width: '100%',
              height: '100%',
              
               
             }}>
      <View style={styles.header}>
        <View>
        <View style={styles.specialty}>
          {/* <Text style={styles.specialtyText}>
            Chuyên khoa Thần kinh gồm {doctors.length} bác sĩ
          </Text> */}
        {/* <TouchableOpacity 
        style={styles.viewDetail}
        >
          <Text style={styles.textDetail}>
            Xem chi tiết 
          </Text>
        </TouchableOpacity> */}
        <LottieView
        source={{
          uri: 'https://assets2.lottiefiles.com/packages/lf20_2ZKqKUm2Jm.json',
        }}
        autoPlay
        loop={true}
        speed={0.5}
        style={{
          width: 300,
          height: 300,
          alignSelf: 'center',
          textAlign: 'center',

        }}

      /> 
        
      </View>
      
      {/* <View style={styles.description}>
     
                      <View style={{width: width, 
                     height: readMore ? 'auto' : 200,
                overflow: readMore ? 'visible' : 'hidden'
   }}>
      <RenderHtml contentWidth={width} source={{ html: item.contentHTML }} 
       style={
            {
                width: width,
                padding: 10,
                
            }
          
       }
       
       
       />
              <TouchableOpacity onPress={() => {
                    setReadMore(!readMore)
       }}>
                    <Text style={{
                        color: 'blue',
                        textAlign: 'center',
                        padding: 10,
                    }}>
                        {readMore ? 'Read Less' : 'Read More'}
                    </Text>
        </TouchableOpacity>
       </View>
       
      </View> */}
        </View>
        
      </View>
      <Text style={styles.headerText}>Select Location:</Text>
      
        <Picker
          style={styles.picker}
          selectedValue={selectedLocation}
          onValueChange={(itemValue) => setSelectedLocation(itemValue)}
        >
          {province &&
            province.map((item, index) => {
                return (

                    <Picker.Item key={index} label={item.valueVi} value={item.valueVi} />
                )
                }

            )
          }
        </Picker>
      <View style={styles.doctorList}>
        {/* {filteredDoctors.map(doctor => (
          <TouchableOpacity key={doctor.id} style={styles.doctorCard}
          onPress={() => navigation.navigate('Doctor', {
            doctor: doctor,
            name: "Bác sĩ "+ doctor.userData.lastName + " " +doctor.userData.firstName,
          })}
          >
            <Image source={
                {uri: doctor.userData.image}
            } style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.userData.lastName + " " +doctor.userData.firstName}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialtyData.name}</Text>
              <Text style={styles.doctorLocation}>{doctor.provinceData.valueVi}</Text>
            </View>
          </TouchableOpacity>
        ))} */}
        <FlatList
          data={filteredDoctors}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} style={styles.doctorCard}
            onPress={() => navigation.navigate('Doctor', {
              doctor: item,
              name: "Bác sĩ "+ item.userData.lastName + " " +item.userData.firstName,
            })}
            >
              <Image source={
                  {uri: item.userData.image}
              } style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{item.userData.lastName + " " +item.userData.firstName}</Text>
                <Text style={styles.doctorSpecialty}>{item.specialtyData.name}</Text>
                <Text style={styles.doctorLocation}>{item.provinceData.valueVi}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      </LinearGradient>
      </ImageBackground>
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
    
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  picker: {
    width: 150,
  },
  doctorList: {
    flex: 1,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    },
    doctorSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    },
    doctorLocation: {
    fontSize: 14,
    color: '#666',
    },
    specialty: {
        
        
        width: "100%",
        
        marginLeft: 30,
        
        
        },
   
        specialtyLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
        },
        specialtyText: {
        fontSize: 18,
        color: '#666',
        },
        viewDetail: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
        },
        textDetail: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        },
        
        
        

});
export default SpecialtyScreen;

