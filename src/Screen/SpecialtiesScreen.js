import axios from "../axios";
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { SearchBar } from "@rneui/base";

const Specialties = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
      const [specialties, setSpecialties] = useState([]);
      const [search, setSearch] = useState("");
    let getDatas = async () => {
        const specialty = await axios.get("/api/get-all-speciality");
        setSpecialties(specialty.specialities);
    }
    useEffect(() => {
        getDatas();
    }, [])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.item, selectedId === item.id && styles.selectedItem]}
        onPress={
          () => {
            setSelectedId(item.id);
            navigationSchedule(item);
          }
        }
      >
        <ImageBackground source={
            { uri: item.image }
        } style={styles.imageBackground}>
          <Text style={[styles.title, selectedId === item.id && styles.selectedTitle]}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  let navigationSchedule = (item) => {
    navigation.navigate("SpecialtyScreen", {
      item: item,
      name:  item.name,
    })
  }

  return (
    <View style={styles.container}>
      
      <SearchBar
      placeholder="Tìm chuyên khoa..."
      onChangeText={
        (text) => {
          setSearch(text);
        }
      }
      value={search}
      platform="ios"
      
    />
      <FlatList
        data={specialties}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedItem: {
    backgroundColor: '#f08080',
  },
  imageBackground: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  selectedTitle: {
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Specialties;
