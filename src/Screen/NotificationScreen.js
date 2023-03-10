import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const NotificationScreen = () => {
    let iconNotication = "https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-notification-icon-png-image_927192.jpg"
    let iconClock = "https://cdn-icons-png.flaticon.com/512/3917/3917267.png"
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Bạn đã đăng kí tài khoản thành công',
      content: 'Chúc mừng bạn đã đăng kí tài khoản thành công',
      time: '10:30 AM - 12/12/2021',
      image: 'https://tophinhanhdep.com/wp-content/uploads/2021/11/Doctor-Cartoon-Wallpapers.png',
    },
    {
        id: '2',
        title: 'Bạn chưa đánh giá lịch hẹn này',
        content: 'Hãy đánh giá lịch hẹn của bạn để chúng tôi có thể cải thiện dịch vụ',
        time: '10:30 AM - 12/12/2021',
        image: 'https://tophinhanhdep.com/wp-content/uploads/2021/11/Doctor-Cartoon-Wallpapers.png',
        },
        {
            id: '3',
            title: 'Bạn chưa đánh giá lịch hẹn này',
            content: 'Hãy đánh giá lịch hẹn của bạn để chúng tôi có thể cải thiện dịch vụ',
            time: '10:30 AM - 12/12/2021',
            image: 'https://tophinhanhdep.com/wp-content/uploads/2021/11/Doctor-Cartoon-Wallpapers.png',
            },

   
  ]);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer}>
      <View style={styles.imageContainer}>
        <Image source={{
            uri: iconNotication
        }} style={styles.notificationImage} />
      </View>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationContent} numberOfLines={2}>{item.content}</Text>
        <View style={styles.notificationTimeContainer}>
          <Image source={{
            uri: iconClock
          }} style={styles.notificationTimeIcon} />
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  imageContainer: {
    backgroundColor: '#f2f2f2',
    padding: 3,
    borderRadius: 50,
    marginRight: 10,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  notificationContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notificationTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTimeIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
    tintColor: '#999',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationScreen;
