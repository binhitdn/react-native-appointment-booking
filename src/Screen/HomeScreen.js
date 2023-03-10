import axios from "../axios";
import { useEffect, useState } from "react";
import { View,Text, ScrollView } from "react-native";
import ListSpecialtyCard from "./ListSpecialtyCard";
import ListDoctor from "./ListDoctor";
import { TouchableOpacity } from "react-native";
import SliderService from "./SliderService";

export default function HomeScreen( {navigation}) {
    let [specialty, setSpecialty] = useState([]);
    let [doctors, setDoctors] = useState([]);
    
    let getAllData = async () => {
        try {
            const specialty = await axios.get("/api/get-all-speciality");
            setSpecialty(specialty.specialities);
            const doctor = await axios.get('/api/top-docter-home');
            setDoctors(doctor.data);
        } catch (error) {
            console.log("Error", error);
        
        }
        
    }
    useEffect(() => {
        getAllData();
    }, [])

    return (
        <ScrollView style={{backgroundColor: "#fff"}}>
            <View >
            {/* <ListSpecialtyCard specialty={specialty} />
            <ListDoctor doctors={doctors} /> */}
            {/* <View >
               
                <View className="flex flex-row justify-between items-center ml-4 mr-4 mt-4">
                    <Text
                    className="font-bold text-xl"
                    >
                        Chuyên khoa
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SpecialtiesScreen")}
                    className="border border-gray-300 rounded-lg px-2 py-1"
                    >
                        <Text
                        className="text-gray-500"
                        >
                            Xem tất cả
                        </Text>
                    </TouchableOpacity>
                </View>
                <ListSpecialtyCard specialty={specialty} navigation={navigation} />
                <TouchableOpacity onPress={() => navigation.navigate("SliderNe")}
                className="flex flex-row justify-center items-center"
                >
                 <Text>
                        Test
                 </Text>
                </TouchableOpacity>
            </View> */}
            <SliderService doctors={doctors} navigation={navigation} />
            <TouchableOpacity onPress={() => navigation.navigate("Noti")}
                className="flex flex-row justify-center items-center"
                >
                    <Text>
                        Test
                    </Text>
            </TouchableOpacity>
            <View>
                <View className="flex flex-row justify-between items-center ml-4 mr-4 mt-4">

                    <Text
                    className="font-bold"
                    style={{
                        backgroundColor: "rgb(253, 220, 100)",
                        padding: 5,
                        borderRadius: 5,
                        fontSize: 16,
                        fontWeight: "bold",
                    }}
                    >
                        Bác sĩ nổi bật
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Doctors")}
                    
                    >
                        <Text
                        
                        style={{
                            color: "blue",
                            fontSize: 16,
                            fontWeight: "bold",
                            
                            
                        }}

                        >
                            Xem tất cả
                        </Text>
                    </TouchableOpacity>
                </View>
                <ListDoctor doctors={doctors} navigation= {navigation} />
                <TouchableOpacity
                onPress={() => navigation.navigate("TestScreen")}
                >
                    <Text>
                        Test Screen
                    </Text>
                </TouchableOpacity>
                
            </View>
            
        </View>
        </ScrollView>
    )
}