import React, { useState, useEffect, useCallback, useContext } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { Authorization } from '../context/Authorization';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

export default function ChatDoctor({ route }) {
    const doctorData = route.params.doctorData;
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const { user } = useContext(Authorization);
    const recipientId = 3;

    // const sendDefaultMessage = async () => {
    //     const defaultMessage = {
    //         _id: new Date().getTime(),
    //         text: 'Bạn có một cuộc họp vào ngày 30/4 vui lòng đến đúng thời gian!!',
    //         createdAt: new Date(),
    //         user: {
    //             _id: recipientId, // Tin nhắn sẽ được gửi từ người nhận
    //             name: 'Người nhận', // Thay thế bằng tên của người nhận
    //             avatar: 'https://example.com/avatar.png' // Thay thế bằng link avatar của người nhận
    //         }
    //     };
    //     await addDoc(collection(database, 'chats'), defaultMessage);
    // };
    // useEffect(() => {
    //     sendDefaultMessage();
    // }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(database, 'chats'),
                orderBy('createdAt', 'desc'),
                where('user.email', '==', user.email || ""),
                where('user.email_recipient', '==', doctorData.userData.email || "")
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
        const messagesRef = collection(database, 'chats');
        const querySnapshot = query(messagesRef, where('_id', '==', _id));
        const querySnapshotData = await getDocs(querySnapshot);
        const messagesData = querySnapshotData.docs.map(doc => doc.data());

        // Nếu đã tồn tại thì cập nhật lại tin nhắn
        if (messagesData.length > 0) {
            const messageRef = doc(database, 'chats', messagesData[0]._id);
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


    return (

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
                email: user.email,
                email_recipient: doctorData.userData.email,
                avatar: user.image
            }}

        >

        </GiftedChat>

    );
}
