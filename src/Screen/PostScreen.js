import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import RenderHtml from 'react-native-render-html';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const PostScreen = ({
  route,
  navigation,
}) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, text: 'Bình luận 1' },
    { id: 2, text: 'Bình luận 2' },
    { id: 3, text: 'Bình luận 3' },
  ]);
 const item = route.params.item;

  const handleAddComment = () => {
    if (comment !== '') {
      const newComment = { id: comments.length + 1, text: comment };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

           <View style={styles.header}>
           <Text style={styles.title}>
             {item.title}
           </Text>
           <View style={styles.imageContainer}>
             <Image
              style={styles.image}
              source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
  <View style={styles.infoItem}>
    <FontAwesome name="eye" size={20} color={Colors.gray} />
    <Text style={[styles.infoText, styles.infoViews]}>20 view views</Text>
  </View>
  <View style={styles.infoItem}>
    <FontAwesome name="calendar" size={20} color={Colors.gray} />
    <Text style={[styles.infoText, styles.infoDate]}>
      djfdfdjfdjfdjf
    </Text>
  </View>
        </View>
       <Image
          style={styles.imageBackground}
          source={{ uri: item.image }}
       >


       </Image>
        

        
        

        {/* <Text style={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec dolor ac mi
          imperdiet euismod. Sed ac urna arcu. Nullam aliquet, purus nec malesuada tincidunt, neque
          dui feugiat turpis, id fermentum augue nisi et est. Sed venenatis dolor ac justo commodo
          blandit. Sed euismod nisi vel blandit ullamcorper. Sed at urna eget velit eleifend
          ultrices. Aenean aliquam suscipit faucibus. Nullam quis commodo metus, vel bibendum
          tellus.
        </Text> */}
        <RenderHtml
          contentWidth={300}
          source={{ html: item.contentHTML }}
        />

        <Text style={styles.commentsHeading}>Bình luận ({comments.length})</Text>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.comment}>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Viết bình luận..."
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
          <Text style={styles.commentButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  imageBackground: {
    marginBottom: 20,
    borderRadius: 10,
    width: '100%',
    height: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  commentsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comment: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 5,
    color: Colors.gray,
    fontSize: 16,
  },
  infoViews: {
    
    fontSize: 18,
  },
  infoDate: {
    
    fontSize: 14,
  },






});

export default PostScreen;