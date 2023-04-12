import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import moment from 'moment';

export default function ScheduleFinish(
    {
        navigation, item
    }
) {
    return (
        <TouchableOpacity className="flex flex-row justify-between items-center mh-2 border-b	 border-gray-300 w-96 rounded-sm overflow-hidden p-2 bg-white shadow-md"
            key={item.id}
            onPress={() => {
                navigation.navigate("ReviewBookingFinish",
                    {
                        item: item,
                        name: "Đánh giá cuộc hẹn"
                    }
                );
            }
            }
        >
            <View className="flex flex-row justify-center items-center">
                <Avatar.Image
                    size={40}
                    source={{

                        uri: item.doctorData.userData.image
                    }}
                />
                <View className="flex flex-col justify-center items-center ml-1">
                    <Text className="flex flex-row justify-center items-center font-bold">
                        {item.doctorData.userData.lastName} {item.doctorData.userData.firstName}
                    </Text>
                    <Text className="flex flex-row justify-center items-center font-1xl">
                        {item.doctorData.specialtyData.name}
                    </Text>
                </View>
            </View>
            <View>
                <Text className="flex flex-row justify-center items-center  font-bold text-green-500"
                >
                    {
                        item.reviewerBookingData.id ? "Đã đánh giá" : "Chưa đánh giá"
                    }

                </Text>


            </View>
            <View>
                <Text className="flex flex-row justify-center items-center bg-green-500 rounded-xl p-1 font-bold text-white text-xs">
                    {/* {item.timeTypeData2.valueEn}  */}
                    {moment(item.date).format("DD-MM-YYYY")}
                </Text>
            </View>

        </TouchableOpacity>
    )
}