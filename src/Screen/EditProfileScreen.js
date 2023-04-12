import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import axios from '../axios';
import { Authorization } from '../context/Authorization';


const PersonalInfo = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState("https://i.pinimg.com/474x/3d/b7/9e/3db79e59b9052890ea1ffbef0f3970cc.jpg");
  const { user } = useContext(Authorization);


  let getData = async() => {
    let data = await axios.get('/api/get-all-users?id=' + user.id);
    setFirstName(data.data.firstName);
    setLastName(data.data.lastName);
    setGender(data.data.gender);
    setPhoneNumber(data.data.phoneNumber);
    setEmail(data.data.email);
    setAddress(data.data.address);
    setAvatar(data.data.image);
    
  }
  useEffect(() => {
    getData();
  }, []);
  const handleUpdateAvatar = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setAvatar(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleUpdateAvatar}>
        <Image
          source={avatar ? { uri: avatar } : {uri: avatar} }
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder="Họ"
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}> </Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder="Tên"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.flex}>
          <Text style={styles.label}>Giới tính</Text>
          <Picker
        selectedValue={gender}
        style={styles.input}
        onValueChange={
          (e) => {
            setGender(e)
            
          }
        }
      >
        
            <Picker.Item label="Nam" value="Nam" />
            <Picker.Item label="Nữ" value="Nữ" />
         
              </Picker>
          
          
        </View>
        <View style={styles.flex}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder="Số điện thoại"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
          />
        </View>
        
      </View>
      <View style={styles.row}>
      <View style={styles.column}>
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Địa chỉ"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  column: {
    flex: 1,
  },
  flex: {
    flex: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
});

export default PersonalInfo;

