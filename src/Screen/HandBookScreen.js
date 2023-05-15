import React, { useEffect, useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from '../axios';
import moment from 'moment/moment';
import LottieView from 'lottie-react-native';


function HandBookScreen(
  {
    navigation
  }
) {
  const [search, setSearch] = useState("");
  const [handBook, setHandBook] = useState([]);

  let getData = async () => {
    var handBook = await axios(

      "/api/get-all-handbook"
    )
    setHandBook(handBook.data);

  }
  useEffect(() => {
    getData();
  }, [])

  const updateSearch = (search) => {
    setSearch(search);
  };
  let formatFromNow = (date) => {
    let fromNow = moment(new Date(date)) - moment(new Date());

    let days = -Math.floor(fromNow / (1000 * 60 * 60 * 24)) - 1;
    let hours = -Math.floor((fromNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) - 1;
    let minutes = -Math.floor((fromNow % (1000 * 60 * 60)) / (1000 * 60)) - 1;
    let seconds = -Math.floor((fromNow % (1000 * 60)) / 1000) - 1;

    if (days > 5) {
      return "Đã đăng vào ngày " + moment(date).format("DD/MM/YYYY");
    }
    if (days > 0) {
      return days + " ngày trước";
    }
    if (hours > 0) {
      return hours + " giờ trước";
    }
    if (minutes > 0) {
      return minutes + " phút trước";
    }
    if (seconds > 0) {
      return seconds + " giây trước";
    }
    return "Vừa xong";

  }

  let removeAccents = (str) => {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }
  let handleRedirectPost = (item) => {
    navigation.navigate("PostDetailScreen", { item: item })
  }
  return (
    <View

    >
      <SearchBar
        placeholder="Tìm cẩm nang..."
        onChangeText={updateSearch}
        value={search}
        platform="ios"

      />
      <ScrollView>
        {
          handBook.filter((item) => {
            if (search == "") {
              return item;
            } else if ((removeAccents(item.title.toLowerCase())).includes(removeAccents(search.toLowerCase()))) {
              return item;
            }
          }).map((item, index) => {

            return (
              <TouchableOpacity className="flex flex-row justify-center" key={index}
                onPress={
                  () => handleRedirectPost(item)
                }



              >
                <View className="flex flex-col justify-center items-center m-2 border border-gray-300 w-96 rounded-xl overflow-hidden"

                >
                  <Image source={
                    { uri: item.image }
                  } className="w-full h-48 rounded-xl"
                  />

                  <View className="flex flex-col justify-center items-center p-2">
                    <Text className="text-gray-700 font-bold text-xl">
                      {item.title}
                    </Text>
                  </View>
                  <Text className="text-gray-700  "
                    style={{
                      height: 75,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: 25,
                      WebkitLineClamp: 3,
                      textAlign: "justify",
                      marginHorizontal: 20,

                    }}
                  >
                    {
                      item.description
                    }
                  </Text>


                  <View className="flex flex-row justify-between p-2
                  gap-2
                  
                  ">
                    <Text>
                      <Ionicons name="eye-outline" size={20} color="orange" />
                      {
                        item.view
                      }
                    </Text>
                    <Text>
                      <AntDesign name="like2" size={20} color="orange" />
                      {
                        formatFromNow(item.createdAt)
                      }
                    </Text>
                  </View>

                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  );
};


export default HandBookScreen;