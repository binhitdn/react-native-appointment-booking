
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Text, TouchableOpacity, ImageBackground,Image } from 'react-native';
import servicedata from '../services/servicedata';
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 1;
const ITEM_HEIGHT = ITEM_WIDTH * 0.75;
const SPACING = 0;

const data = [
  { id: 1, title: 'Service 1', image: 'https://source.unsplash.com/featured/?service1' },
  { id: 2, title: 'Service 2', image: 'https://source.unsplash.com/featured/?service2' },
  { id: 3, title: 'Service 3', image: 'https://source.unsplash.com/featured/?service3' },
  { id: 4, title: 'Service 4', image: 'https://source.unsplash.com/featured/?service4' },
  { id: 5, title: 'Service 5', image: 'https://source.unsplash.com/featured/?service5' },
];

const SliderService = ({doctors}) => {
  const flatListRef = useRef( null );
  const scrollX = useRef(new Animated.Value(0)).current;
  

  

  useEffect(() => {
    

    let i = 0;
    const interval = setInterval(() => {
        if(i < data.length) {
            if (flatListRef && flatListRef.current) {
                flatListRef.current.scrollToIndex({index: i, animated: true});
            }
        } else {
            i = 0;
            flatListRef.current.scrollToIndex({index: i, animated: true});
        }
        i++;
    }, 3000);
        
    return () => clearInterval(interval);

    
  }, []);
  

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SPACING * 2),
      index * (ITEM_WIDTH + SPACING * 2),
      (index + 1) * (ITEM_WIDTH + SPACING * 2),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.itemContainer, { opacity, transform: [{ scale }] }]}>
        {/* <View style={styles.item}>
        <TouchableOpacity key={index} style={styles.doctorCard} onPress={() => {
                                navigation.navigate("Doctor", {
                                    doctorId: item.id
                                })
                            }}>
                            <Image style={styles.avatar} source={{ uri: item.userData.image }} />                      
                                <View
                                style={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginLeft: 10,
                                    marginRight: 10
                                }}
                                >
                                <Text style={styles.name}>{item.userData.lastName + " " + item.userData.firstName}</Text>
                                <Text style={styles.specialty}>{item.specialtyData.name}</Text>     
                                <Text style={styles.location}>{item.province}</Text>
                                </View>                   
                        </TouchableOpacity>
        </View> */}
        <View style={styles.item}>
            
            <Image 
            source={{uri: item.image}}
            style={styles.image}
            

             />
            <Text style={styles.titleSlide}>{item.name.vi}
            </Text>
           
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={servicedata}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate={0}
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        contentContainerStyle={{ alignItems: 'center' }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        renderItem={renderItem}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH + SPACING * 2,
          offset: (ITEM_WIDTH + SPACING * 2) * index,
          index,
        })}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    
    marginBottom: 10,
  },
    image: {
        width: "100%",
        height: "80%",
        resizeMode: "cover",
        
    },
  itemContainer: {
    width: ITEM_WIDTH,
    height: "auto",
    margin: SPACING,
    alignItems: 'center',
    justifyContent: 'center',
  
    
    },
    item: {
        width: ITEM_WIDTH * 1,
        height: ITEM_HEIGHT * 0.7,
        
        borderRadius: 30,
        // alignItems: 'center',
        justifyContent: 'center', 
        border : "1px solid #ccc",
        

    },
    doctorCard: {
        alignItems: "center",
        // backgroundColor: "white",
        // borderRadius: 10,
        // elevation: 5,
        flex: 1,
        flexDirection: "row",
        
        height: 160,
        // justifyContent: "center",
        margin: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: "100%",
        height: "100%",
        
      },
      avatar: {
        borderRadius: 50,
        height: 100,
        marginBottom: 10,
        width: 100,
        resizeMode: "cover",
      },
      name: {
        color: "gray",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
      },
      specialty: {
        color: "gray",
        fontWeight: "bold",
        textAlign: "center",
      },
      titleSlide: {
        color: "orange",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 14,
        borderBottomColor: "orange",
        
        
      },
});
export default SliderService;