import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function ListDoctor({ doctors, navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {
          doctors && doctors.slice(0, 4).map((item, index) => {
            return (
              <TouchableOpacity key={index} style={styles.doctorCard} onPress={() => {
                navigation.navigate("Doctor", {
                  doctor: item
                })
              }}>
                <Image style={styles.avatar} source={{ uri: item.userData.image }} />
                <Text style={styles.name}>{item.userData.lastName + " " + item.userData.firstName}</Text>
                <Text style={styles.specialty}>
                  {item.specialtyData.name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  doctorCard: {
    alignItems: "center",
    backgroundColor: "rgb(253, 220, 200)",

    borderRadius: 10,
    elevation: 5,
    height: 160,
    justifyContent: "center",
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 150,
  },
  avatar: {
    borderRadius: 50,
    height: 80,
    marginBottom: 10,
    width: 80,
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  specialty: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
