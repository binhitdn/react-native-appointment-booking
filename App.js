import { NavigationContainer } from '@react-navigation/native';
import { Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './src/TabNavigation';
import SpecialtyScreen from './src/Screen/SpecialtyScreen';
import { Avatar } from 'react-native-paper';
import ChatScreen from './src/Screen/ChatScreen';
import { useEffect, useState } from 'react';
import Login from './src/Screen/Auth/Login';
import Register from './src/Screen/Auth/Register';
import { Authorization } from './src/context/Authorization';
import Doctor from './src/Screen/Doctor';
import Doctors from './src/Screen/Doctors';
import EditProfileScreen from './src/Screen/EditProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import axios from './src/axios.js';
import messaging from '@react-native-firebase/messaging';
import Loading from './src/Screen/Loading';
import PostScreen from './src/Screen/PostScreen';
import SliderNe from './src/Screen/SliderNe';
import ReviewBookingFinish from "./src/Screen/ReviewBookingFinish";
import BookingForm from './src/Screen/BookingForm';
import BookingHistory from './src/Screen/BookingHistory';
import BookingSuccess from './src/Screen/BookingSuccess';
import NotificationScreen from './src/Screen/NotificationScreen';
import Noti from './src/Screen/Noti';
import ReviewSuccess from './src/Screen/ReviewSuccess';
import LottieView from 'lottie-react-native';
import { Provider } from 'react-native-paper';
import { StyleSheet } from 'react-native';




const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    if (token) {

      (async () => {
        await getUserWithToken();
      })();

    } else {

    }
  }, [token])



  let getUserWithToken = async () => {

    try {
      const decoded = await jwt_decode(await AsyncStorage.getItem('token'));
      const expire = decoded.exp;
      const email = decoded.userEmail;
      const currentDate = new Date();

      if (expire * 1000 < currentDate.getTime()) {
        console.log("Token expired");
      } else {

        getUserById(decoded.userId);
      }

    } catch (e) {




    }

  }
  useEffect(() => {

    retrieveData();




  }, [])


  let getUserById = async (id) => {
    let getUser = await axios.get(`/api/get-all-users?id=${id}`);

    setUser(getUser.users);
    setLoading(false);

  }
  const retrieveData = async () => {
    try {

      setToken(await AsyncStorage.getItem('token'));
      setLoading(false);
      if (value !== null) {
        // We have data!!


      }

    } catch (error) {
    }
  };
  if (loading) {
    return <Loading
      label={"Đang lấy thông tin đăng nhập..."}
    />
  }
  return (
    <NavigationContainer

    >
      <StatusBar backgroundColor="rgb(253, 190, 104)" barStyle="light-content" />

      {
        user ? (
          <Provider theme={isDarkTheme ? "DarkTheme" : "DefaultTheme"}>
            <Authorization.Provider value={{ user, setUser }}>
              <Stack.Navigator>
                <Stack.Screen name="TabNavigation" component={MyTabs}

                  options={({ navigation }) => ({
                    headerLeft: () => (
                      <View>
                        <Image
                          source={require('./assets/icon.png')}
                          style={{ width: 160, height: 35, marginLeft: 3 }}
                        />
                      </View>
                    ),
                    headerRight: () => (
                      <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen", {
                        name: "Thông báo"
                      })}>
                        {/* <Avatar.Icon size={30} icon="bell" style={{marginRight: 10}} /> */}
                        <LottieView
                          source={require('./assets/lottie/IconNotification.json')}
                          autoPlay
                          loop={true}
                          speed={0.5}
                          style={{
                            width: 70,
                            height: 70,
                            alignSelf: 'center',
                          }}
                        />
                      </TouchableOpacity>
                    ),
                    headerTitle: "",
                    headerStyle: {
                      backgroundColor: "white",
                      elevation: 0,
                      shadowOpacity: 0,
                      borderBottomWidth: 0,
                    },

                  })} />
                <Stack.Screen
                  name="SpecialtyScreen"
                  component={SpecialtyScreen}
                  options={
                    ({ route }) => ({ title: route.params.name })

                  }

                />
                <Stack.Screen
                  name="SpecialtiesScreen"
                  component={SpecialtyScreen}
                  options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                  name="ChatScreen"
                  component={ChatScreen}
                  options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                  name="Doctor"
                  component={Doctor}
                  options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                  name="Doctors"
                  component={Doctors}
                  options={({ route }) => ({ title: route.params.name })}

                />
                <Stack.Screen
                  name="EditProfileScreen"
                  component={EditProfileScreen}
                  options={({ route }) => ({ title: route.params.name })}

                />
                <Stack.Screen
                  name="PostDetailScreen"
                  component={PostScreen}
                  options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                  name="SliderNe"
                  component={SliderNe}
                  options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                  name="ReviewBookingFinish"
                  component={ReviewBookingFinish}
                  options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                  name="BookingForm"
                  component={BookingForm}
                  options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                  name="BookingHistory"
                  component={BookingHistory}
                  options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                  name="BookingSuccess"
                  component={BookingSuccess}
                  options={
                    {
                      headerShown: false
                    }
                  }
                />
                <Stack.Screen
                  name="NotificationScreen"
                  component={NotificationScreen}
                  options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                  name="Noti"
                  component={Noti}

                />
                <Stack.Screen
                  name="ReviewSuccess"
                  component={ReviewSuccess}
                  options={{
                    headerShown: false,
                    style: styles.darkMode
                  }}

                />


              </Stack.Navigator>

            </Authorization.Provider>
          </Provider>
        ) : (
          <Provider theme={isDarkTheme ? "DarkTheme" : "DefaultTheme"}>
            <Authorization.Provider value={{ user, setUser }}>
              <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              </Stack.Navigator>
            </Authorization.Provider>
          </Provider>
        )
      }

    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  darkMode: {
    backgroundColor: "black",
    color: "white"
  },
  lightMode: {
    backgroundColor: "white",
    color: "black"
  }
})

