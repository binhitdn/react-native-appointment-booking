import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native'; import { Text } from 'react-native-paper';
3

export default function ChatScreen() {


  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(database, 'chats'), orderBy('createdAt', 'desc')), (querySnapshot) => {
      const messagesFirestore = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data();
        const data = {
          _id: doc.id,
          text: 'get from firebase',
          createdAt: firebaseData.createdAt.toDate(),
          ...firebaseData
        };
        if (!firebaseData.system) {
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.email
          };
        }
        return data;
      });
      setMessages(messagesFirestore);

    });


    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), { // use firestore() method to get Firestore instance
      _id,
      createdAt,
      text,
      user
    });
  }, []);


  return (
    <>
      {messages.map(message => (
        <Text key={message._id}>{message.text}</Text>
      ))}

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
          _id: 2,
          avatar: 'https://i.pravatar.cc/300'
        }}



      />
    </>
  );
}
