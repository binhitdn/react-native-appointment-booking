import { Image, Text, TouchableOpacity } from "react-native";

const SpecialtyCard = ({ item ,navigation}) => {
    
    return (
        <TouchableOpacity 
        className=" rounded-lg h-40  m-2 bg-gray-100 shadow-lg"
        onPress={() => {
            navigation.navigate("SpecialtyScreen", {item: item})
        }
        }
        >
            <Image source={
                { uri: item.image  }
            }  
            className="rounded-t-lg h-32 w-64"/>
            <Text 
            className="text-center text-gray-700 font-bold text-xl"
            >{item.name}</Text>
        </TouchableOpacity>
    );
};
export default SpecialtyCard; 