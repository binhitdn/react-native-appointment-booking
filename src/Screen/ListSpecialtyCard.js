
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SpecialtyCard from "./SpecialtyCard";

export default function ListSpecialtyCard({ specialty, navigation }) {
    const flatListRef = useRef(null)
    let index=0;
    const totalIndex = specialty.length - 1;


  useEffect (() => { 
  setInterval (() => {
  index++;
  if(index < totalIndex) {
    if (flatListRef && flatListRef.current) {
        flatListRef.current.scrollToIndex({index: index, animated: true});
    }
  } else {
        index = 0;
  }
  }, 2000)
  return () => clearInterval();
  }, []);
    
    

    return (
        
            
                <FlatList 
                ref={flatListRef}
                data={specialty}
                renderItem={({item}) => <SpecialtyCard item={item} navigation={navigation} />}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                />
           
        
    )
}