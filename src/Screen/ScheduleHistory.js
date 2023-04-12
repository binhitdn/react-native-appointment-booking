import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import moment from 'moment'

export default function ScheduleHistory(
    {
        navigation, item
    }
) {
    return (
        <TouchableOpacity className="flex flex-row justify-between items-center mh-2 border-b	 border-gray-300 w-96 rounded-sm overflow-hidden p-2 bg-white shadow-md"
            key={item.id}
            onPress={() => {
                navigation.navigate("BookingHistory",
                    {
                        item: item
                    })
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
            <View
                style={{
                    backgroundColor: item.statusData.valueVi === "Đã hủy" ? "#FF0000" : "#00FF00",
                    color: item.statusData.color === "#FF0000" ? "#FFFFFF" : "#000000",
                    borderRadius: 8,
                    padding: 5,
                }}
            >
                <Text className="flex flex-row justify-center items-center  font-bold"
                    style={{

                        color: item.statusData.color === "#FF0000" ? "#FFFFFF" : "#000000"
                    }}
                >
                    {/* {
                item.reviewerBookingData.id  ? "Đã đánh giá" : "Chưa đánh giá"
               } */}
                    {
                        item.statusData.valueVi
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