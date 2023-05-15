import axios from "../../axios";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { Authorization } from "../../context/Authorization";
const backImage = require("../../../assets/backImage.png");
import AsyncStorage from "@react-native-async-storage/async-storage"
import storage from "../../storage/storage";
export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Authorization)

  const onHandleLogin = async () => {
    let res = await axios.post('api/login', {
      email: email,
      password: password
    })
    if (res.errCode === 0) {
      Alert.alert("Đăng nhập thành công", res.message);
      await AsyncStorage.setItem('token',
        res.token);
      storage.save({
        key: 'user',
        data: res.user,
        expires: 1000 * 360000
      })
      setUser(res.user);




    } else {
      if (res.errCode === 1) {
        Alert.alert("Login error", res.message);
      } else if (res.errCode === 2) {
        Alert.alert("Login error", res.message);
      } else if (res.errCode === 3) {
        Alert.alert("Login error", res.message);
      }
    }
    try {
      await AsyncStorage.setItem('token', res.token)
    } catch (error) {
      console.log(error)
    }
    // retrieveData();



  };
  // const retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('token');
  //     if (value !== null) {
  //       // We have data!!

  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Log In</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}> Đăng kí !!!</Text>
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