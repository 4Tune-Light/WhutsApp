import React, { useEffect } from 'react'
import styles from './styles'
import Firebase from '../../../publics/Firebase'
import { View, Text, ActivityIndicator, AsyncStorage, Image, Dimensions } from 'react-native'


const LoadingScreen = props => {
	useEffect(() => {
		AsyncStorage.getItem('key').then(key => {
      if (key) {
        Firebase.database().ref('users/' + key).update({status: '1'})
      }

      setTimeout(() => props.navigation.navigate(key ? 'Home' : 'Login'), 3000)
      
		})
	}, [])

  const loadingImage = require('../../../publics/image/LoadingScreen.png')
  const {width, height} = Dimensions.get('window')
  return (
    <View style={styles.container}>
      <Image source={loadingImage} style={{width, height}} resizeMode='cover' />
    </View>
  )
}

export default LoadingScreen
