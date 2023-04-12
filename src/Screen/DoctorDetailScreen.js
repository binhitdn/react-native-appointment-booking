import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const DoctorDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://via.placeholder.com/150',
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Dr. John Doe</Text>
        <Text style={styles.specialty}>Cardiologist</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          euismod nisi, non faucibus nibh vestibulum ut. Sed sed mi euismod,
          volutpat libero eu, tincidunt felis. Integer vitae venenatis nisi.
        </Text>
        <Text style={styles.contact}>Contact: 123-456-7890</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    marginTop: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 18,
    color: '#999',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  contact: {
    fontSize: 16,
    color: '#999',
  },
});

export default DoctorDetailScreen;
