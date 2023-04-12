import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React from 'react'
import { Avatar, Button, List, ToggleButton } from 'react-native-paper'
import { Authorization } from '../context/Authorization';
import { Switch } from 'react-native-paper';

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = React.useContext(Authorization);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false)
  const onToggleSwitch = () => setIsDarkTheme(!isDarkTheme)
  return (
    <ScrollView>
      <View>
        <View className="bg-white shadow-sm rounded-sm p-4">
          <View className="flex flex-row items-center justify-center">
            <View className="flex flex-col justify-center items-center">
              <Avatar.Image size={120} source={{
                uri: user.image
              }}

              />

              <Text className="text-xl font-semibold">
                {user.lastName + " " + user.firstName}
              </Text>
              <Text className="text-lg text-gray-500">
                {
                  user.email
                }
              </Text>
              <TouchableOpacity className="bg-orange-400 rounded p-2 mt-2"
                onPress={
                  () => navigation.navigate("EditProfileScreen", { name: "Sửa thông tin" })
                }
              >
                <Text className="text-white text-sm font-semibold">
                  Sửa thông tin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="bg-gray shadow-sm rounded-sm p-4">
          <Text className="text-lg font-semibold">
            Hỗ trợ
          </Text>

        </View>
        <View className="bg-white shadow-sm rounded-sm">
          <List.Item
            title="Chat với chúng tôi"
            // description="Item description"
            left={props =>
              <Image source={require("../../assets/profile/chat.png")} style={{
                width: 30, height: 30,
                marginLeft: 5,
              }} />
            }
            right={props =>
              <View className="flex flex-row items-center">
                <Text className="text-sm text-gray-500">


                </Text>
                <List.Icon {...props} icon="chevron-right" />
              </View>}
            style={{ borderBottomWidth: 1, borderBottomColor: "#eee" }}
            onPress={
              () => navigation.navigate("ChatScreen", { name: "Chat với chúng tôi" })
            }
          />
        </View>
        <View className="bg-gray shadow-sm rounded-sm p-4">
          <Text className="text-lg font-semibold">
            Hệ thống
          </Text>

        </View>
        <View className="bg-white shadow-sm rounded-sm">
          <List.Item
            title="Ngôn ngữ"
            // description="Item description"
            left={props =>
              <Image source={require("../../assets/profile/planet-earth.png")} style={{
                width: 30, height: 30,
                marginLeft: 5,
              }} />
            }
            right={props =>
              <View className="flex flex-row items-center">
                <Text className="text-sm text-gray-500">
                  Tiếng Việt
                </Text>
                <List.Icon {...props} icon="chevron-right" />
              </View>}
            style={{ borderBottomWidth: 1, borderBottomColor: "#eee" }}
          />
          <List.Item
            title="Chế độ tối"
            // description="Item description"
            left={props =>
              <Image source={require("../../assets/profile/dark-mode.png")} style={{
                width: 30, height: 30,
                marginLeft: 5,
                marginTop: 6
              }} />
            }
            right={props =>
              <Switch value={isDarkTheme} onValueChange={onToggleSwitch}

              />
            }
          />


        </View>
        <View className=" shadow-sm rounded-sm border-t-1 border-gray-200">
          <Button icon="logout" onPress={
            () => {
              Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "OK", onPress: () => {
                    setUser(null);
                    navigation.navigate("Login");
                  }
                }
              ]);

            }
          }
            style={{


            }}

          >
            Log out
          </Button>

        </View>

      </View>
    </ScrollView>
  )
}