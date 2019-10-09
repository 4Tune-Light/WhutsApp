import React, { useState, useEffect } from 'react'
import Firebase from '../../../../publics/Firebase'
import styles from './styles'
import { Text, View, AsyncStorage, FlatList, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'

const ChatTab = props => {
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ lastMessage, setLastMessage ] = useState([])
  const [ users, setUsers ] = useState([]) 
  const [ done, setDone ] = useState(false)
  const [ key, setKey ] = useState('')

  const handleLogout = () => {
		AsyncStorage.clear()
    props.navigate('Login')
	}

  useEffect(() => {
    AsyncStorage.getItem('key').then(key => {
      setKey(key)
      Firebase.database().ref('users')
        .on('child_added', val => {
          let person = val.val()
          if (key != val.key) {
            setUsers(prevState => [...prevState, person])
          }
        })
    })
  }, [])

  useEffect(() => {
    if (users.length > 0) {
      users.map(user => {
        Firebase.database().ref('messages/' + key + '/' + user.phone).limitToLast(1)
          .on('child_added', val => {
            const newMessage = val.val()
            const newData = {
              phone: user.phone,
              message: newMessage.message,
              time: newMessage.time
            }
              setLastMessage(prevState => [...prevState, newData])
          })
      })
    }
  }, [users])

  const showLastMessage = phone => {
    let message = ''
    for (let i = 0; i < lastMessage.length; i++) {
      if (lastMessage[i].phone === phone) {
        message = lastMessage[i].message
      }
    }
    return message

  }

  const imagePlaceholder = require('../../../../publics/image/ImagePlaceholder.jpg')

  const UserCard = ({ item }) => {
    return(
      <TouchableOpacity style={styles.card} onPress={() => props.navigate('Chat', {name: item.name, phone: item.phone})}>
        <View >
          <Image resizeMode='cover' style={styles.image} source={item.photo ? {uri: item.photo} : imagePlaceholder} />
        </View>
        <View style={styles.nameContainer}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
          </View>

          <View>
            <Text style={styles.chat}>
              {showLastMessage(item.phone)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={UserCard}
        keyExractor={item => item.phone}
      />
    </View>
  )
}

export default ChatTab
