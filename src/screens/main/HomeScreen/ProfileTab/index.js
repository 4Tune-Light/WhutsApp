import { Text, View, AsyncStorage, TouchableOpacity, Image, Button, TextInput } from 'react-native'
import Firebase from '../../../../publics/Firebase'
import React, { useState, useEffect } from 'react'
import { Icon } from 'native-base'
import styles from './styles'

const ProfileTab = props => {
  const [ userStatus, setUserStatus ] = useState('0')
  const [ okay, setOkay ] = useState(true)
  const [ prevName, setPrevName ] = useState(null)
  const [ userName, setUserName ] = useState('')
  const [ edit, setEdit ] = useState(false)
  let inputFocus = null


  const handleLogout = () => {
    AsyncStorage.getItem('key').then(key => {
      Firebase.database().ref('users/' + key).update({status: false})
    })
		AsyncStorage.clear()
    props.navigate('Login')
	}

  const handleEdit = () => {
    setPrevName(userName)
    setEdit(true)
    inputFocus.focus()
  }

  const handleCheck = () => {
    AsyncStorage.setItem('userName', userName).then(() => {
      AsyncStorage.getItem('key').then(key => {
        Firebase.database().ref('users/'+ key).update({name: userName})
        setEdit(false)
        inputFocus.blur()
      })
    })
  }

  const handleClose = () => {
    setUserName(prevName)
    setEdit(false)
    inputFocus.blur()
  }

  useEffect(() => {
    if (userName === '') {
      setOkay(false)
    } else {
      setOkay(true)
    }
  }, [userName])

  useEffect(() => {
    AsyncStorage.getItem('userName').then(name => {
      setUserName(name)
    })
    AsyncStorage.getItem('userStatus').then(data => {
      setUserStatus(data)
    })
  }, [])

  const imagePlaceholder = require('../../../../publics/image/ImagePlaceholder.jpg')

  return (
    <View style={styles.container}>
      <Image source={imagePlaceholder} style={styles.image} />
      <View style={styles.statusContainer}>
        <View style={{...styles.circle, backgroundColor: userStatus === '1' ? '#7CB342' : '#696969'}}><Text></Text></View>
        <Text style={{...styles.status, color: userStatus === '1' ? '#7CB342' : '#696969'}}>
          {userStatus === '1' ? 'online' : 'offline'}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextInput 
          ref={ref => inputFocus = ref}
          style={styles.name}
          value={userName}
          maxLength={20}
          onChangeText={text => setUserName(text)}
          editable={edit}
        />
        { edit === false &&
          <TouchableOpacity onPress={() => handleEdit()}>
            <Icon type='AntDesign' name='edit' style={styles.icon} />
          </TouchableOpacity>
        }
        { edit === true &&
          <View style={{flexDirection: 'row', marginTop: 13}}>
            <TouchableOpacity onPress={() => okay === true ? handleCheck() : null}>
              <Icon type='FontAwesome' name='check-square' style={styles.check} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClose()}>
              <Icon type='FontAwesome' name='window-close' style={styles.close} />
            </TouchableOpacity>
          </View>
        }
      </View>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <TouchableOpacity onPress={() => handleLogout()} style={styles.button}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileTab
