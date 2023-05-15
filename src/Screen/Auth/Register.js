import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../config/firebase";
const backImage = require("../../../assets/backImage.png");
import { handleGetAllCode } from "./../../services/systemService"
import { handleCreateUserApi } from "./../../services/userService"

export default function Register({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("M");
  const [genderSelect, setGenderSelect] = useState([]);
  let handleGetData = async () => {
    let data = await handleGetAllCode("GENDER");
    setGenderSelect(data.data.data);
  }
  useEffect(() => {

    handleGetData();
  }, [])

  let handleRegister = async () => {
    let data = {
      email: email,
      password: password,
      rePassword: rePassword,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address,
      gender: gender,
      role: 'R3'
    }





    if (validate()) {
      let res = await handleCreateUserApi(data);
      console.log(res)
      toast.success("Register success. Please login to continue");
      setAuthor("patient");
      navigate('/login');


    }
  }

  let validate = () => {
    if (data.email === "" || data.password === "" || data.rePassword === "" || data.firstName === "" || data.lastName === "" || data.phone === "" || data.address === "") {

      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
      return false;
    } else if (data.password !== data.rePassword) {
      Alert.alert("Thông báo", "Mật khẩu không khớp");
      return false;
    } else if (data.password.length < 6) {
      Alert.alert("Thông báo", "Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    } else if (data.phone.length < 10 || data.phone.length > 11) {
      Alert.alert("Thông báo", "Số điện thoại không hợp lệ");
      return false;
    } else {
      return true;
    }
  }
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Đăng ky</Text>
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}
        >
          <TextInput style={{ ...styles.input, flex: 1, marginRight: 10 }} placeholder="Họ" />
          <TextInput style={{ ...styles.input, flex: 1, marginLeft: 10 }} placeholder="Tên" />
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}
        >
          <Picker
            selectedValue={gender}
            style={{ ...styles.input, flex: 1, marginRight: 10 }}
            onValueChange={
              (e) => {
                setGender(e)
              }
            }
          >

            {
              genderSelect.map((item, index) => {
                return (
                  <Picker.Item label={item.valueVi} value={item.keyMap} key={index} />
                )
              }
              )
            }

          </Picker>
          <TextInput style={{ ...styles.input, flex: 1, marginLeft: 10 }} placeholder="Số điện thoại" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}
        >
          <TextInput style={{ ...styles.input, flex: 1, marginRight: 10 }} placeholder="Mật khẩu" autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password" />
          <TextInput style={{ ...styles.input, flex: 1, marginLeft: 10 }} placeholder="Nhập lại mật khẩu" autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password" />
        </View>
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Đăng kí</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}> Hãy đăng nhập!!!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});