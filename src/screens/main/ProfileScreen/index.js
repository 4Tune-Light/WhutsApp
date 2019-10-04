import { Text, View, AsyncStorage, TouchableOpacity, Image, Button, TextInput } from 'react-native'
import Header from '../../../publics/components/Header'
import React, { useState, useEffect } from 'react'
import Firebase from '../../../publics/Firebase'
import { Icon } from 'native-base'
import styles from './styles'

const ProfileScreen = props => {
  const [ userStatus, setUserStatus ] = useState('0')
  const [ userName, setUserName ] = useState('')
  const [ phone, setPhone ] = useState('')
  
  useEffect(() => {
    setPhone(props.navigation.getParam('phone'))

    Firebase.database().ref('users/' + phone).on('child_changed', val => {
      let person = val.val()
      setUserStatus(person.status)
    })
  }, [])

  useEffect(() => {
    if (phone.length > 0) {
      Firebase.database().ref('users/' + phone).once('value', val => {
        let person = val.val()
        setUserStatus(person.status)
        setUserName(person.name)
      })
    }
  }, [phone])

  const imagePlaceholder = require('../../../publics/image/ImagePlaceholder.jpg')

  return (
    <View style={styles.container}>
      <Header 
        goBack={props.navigation.goBack}
        title={'Profile'}
      />
      <Image source={imagePlaceholder} style={styles.image} />
      <View style={styles.statusContainer}>
        <View style={{...styles.circle, backgroundColor: userStatus === '1' ? '#7CB342' : '#696969'}}><Text></Text></View>
        <Text style={{...styles.status, color: userStatus === '1' ? '#7CB342' : '#696969'}}>
          {userStatus === '1' ? 'online' : 'offline'}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.name}>{userName} </Text>
      </View>
    </View>
  )
}

export default ProfileScreen
