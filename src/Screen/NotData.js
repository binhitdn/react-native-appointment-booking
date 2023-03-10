import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

export default function NotData({message}) {
    let width = Dimensions.get('window').width;
  return (
    <View>
        <Image source={{
            uri: 'https://www.vinmec.com/static/img/image-doctor-qna.dd79fe239b92.png'
        }} style={{width: width, height: 270, alignSelf: 'center',opacity: 0.5}}/>
        <Text className="text-center mt-10"
        style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>{message}</Text>
    </View>

  )
}