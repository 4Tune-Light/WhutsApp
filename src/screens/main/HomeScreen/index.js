import Header from '../../../publics/components/Header'
import MultiTabs from '../../../publics/components/Tabs'

import React, { useState, useEffect } from 'react'
import Firebase from '../../../publics/Firebase'
import styles from './styles'
import { Platform, Image, Text, View, AsyncStorage, Button, BackHandler } from 'react-native'

const HomeScreen = props => {
  const [ currentUser, setCurrentUser ] = useState(null) 
  const [ errorMessage, setErrorMessage ] = useState(null)

  const handleLogout = () => {
		AsyncStorage.clear()
    props.navigation.navigate('Login')
	}

  useEffect(() => {
    return () => {
      AsyncStorage.getItem('key').then(key => {
        Firebase.database().ref('users/' + key).update({status: '0'})
      })
    }
  }, [])

  return (
    <View style={styles.container}>
    	<Header title={'WhutsApp'} 
      />
      <MultiTabs navigate={props.navigation.navigate}/>
    </View>
  )
}

export default HomeScreen
