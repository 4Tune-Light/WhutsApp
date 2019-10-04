import React, { useEffect } from 'react'
import styles from './styles'
import Firebase from '../../../publics/Firebase'
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native'


const LoadingScreen = props => {
	useEffect(() => {
		AsyncStorage.getItem('key').then(key => {
      Firebase.database().ref('users/' + key).update({status: '1'})
      props.navigation.navigate(key ? 'Home' : 'Login')
		})
	}, [])
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default LoadingScreen
