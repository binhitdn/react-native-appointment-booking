import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DoctorList = ({ doctors, specialty }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{specialty} Doctors</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.doctorContainer}>
            <Text style={styles.doctorName}>{item.name}</Text>
            <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
            <Text style={styles.doctorAddress}>{item.address}</Text>
            <Text style={styles.doctorPhone}>{item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  doctorContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  doctorSpecialty: {
    fontSize: 16,
    marginBottom: 5,
  },
  doctorAddress: {
    fontSize: 16,
    marginBottom: 5,
  },
  doctorPhone: {
    fontSize: 16,
    color: '#007aff',
  },
});

export default DoctorList;
