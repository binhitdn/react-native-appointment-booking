import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { Authorization } from '../context/Authorization';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';


export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const { user } = useContext(Authorization);
  const recipientId = 3;





  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(database, 'supportchat'),
        orderBy('createdAt', 'desc'),
        where('user.email', '==', user.email || "")
      ),
      (querySnapshot) => {
        const messagesFirestore = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: firebaseData.createdAt.toDate(),
            user: firebaseData.user,
          };
          return data;
        });
        setMessages(messagesFirestore);
      }
    );

    return unsubscribe;
  }, []);








  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    // Kiểm tra xem đã tồn tại tin nhắn giữa người gửi và người nhận chưa
    const messagesRef = collection(database, 'supportchat');
    const querySnapshot = query(messagesRef, where('_id', '==', _id));
    const querySnapshotData = await getDocs(querySnapshot);
    const messagesData = querySnapshotData.docs.map(doc => doc.data());

    // Nếu đã tồn tại thì cập nhật lại tin nhắn
    if (messagesData.length > 0) {
      const messageRef = doc(database, 'supportchat', messagesData[0]._id);
      await setDoc(messageRef, {
        _id,
        createdAt,
        text,
        user
      });
    }
    // Nếu chưa tồn tại thì thêm mới tin nhắn
    else {
      await addDoc(messagesRef, {
        _id,
        createdAt,
        text,
        user

      });
    }



  }, []);
  // const onSend = () => {
  // }


  return (

    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{}}>

        <LottieView
          source={{
            uri: "https://assets4.lottiefiles.com/packages/lf20_fytm1esb.json"
          }}
          autoPlay
          loop={true}

          speed={0.5}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: 'center', marginTop: -15 }}>
          Trung tâm hỗ trợ
        </Text>
        <Text style={{ fontSize: 14, alignSelf: 'center', marginTop: 5 }}>
          Chúng tôi sẽ trả lời bạn trong thời gian sớm nhất
        </Text>
        <Text style={{ fontSize: 14, alignSelf: 'center', marginTop: 5 }}>
          Chúc bạn một ngày tốt lành!
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
        alwaysShowSend={true}
        onSend={messages => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: '#fff'
        }}
        renderUsernameOnMessage={true}
        textInputStyle={{
          backgroundColor: '#fff',
          borderRadius: 20,
        }}
        user={{
          _id: 1,
          _id_recipient: 3,
          email: user.email,
          email_recipient: 'admin@gmail.com',
          avatar: user.image
        }}



      >

      </GiftedChat>
    </View>

  );
}