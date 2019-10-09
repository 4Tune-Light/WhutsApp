import { Text, View, AsyncStorage, TouchableOpacity, Image, Button, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Firebase from '../../../../publics/Firebase'
import React, { useState, useEffect } from 'react'
import { Icon } from 'native-base'
import styles from './styles'

const ProfileTab = props => {
  const [ userStatus, setUserStatus ] = useState('0')
  const [ prevName, setPrevName ] = useState(null)
  const [ userName, setUserName ] = useState('')
  const [ edit, setEdit ] = useState(false)
  const [ okay, setOkay ] = useState(true)
  const [ avatar, setAvatar ] = useState(null)
  let inputFocus = null

  const options = {
    title: 'Select Photo Profile',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  }

  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.onerror = function() {
        reject(new Error('uriToBlob failed'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  }

  const editPhotoHandler = () => {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        alert('Edit Photo Profile Canceled')
      } else {
        const source = { uri: response.uri };
        setAvatar(source)
        AsyncStorage.getItem('key').then(key => {
          uriToBlob(response.uri).then(blob => {
            const ref = Firebase.storage().ref('images/' + key)
            const db = Firebase.database().ref('users/' + key)
            ref.put(blob, {contentType: 'image/jpeg'})
              .then(() => ref.getDownloadURL())
              .then(url => db.update({photo: url}))
          })
        })
      }
    })
  }


  const handleLogout = () => {
    AsyncStorage.getItem('key').then(key => {
      Firebase.database().ref('users/' + key).update({status: '0'})
		  setTimeout(() => AsyncStorage.clear(), 500)
      props.navigate('Login')
    })
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
    AsyncStorage.getItem('key').then(key => {
      Firebase.storage().ref('images/' + key).getDownloadURL()
        .then(uri => {
          if (uri) {
            setAvatar({uri})
          }
        })
        .catch(err => null)
      
    })
  }, [])

  const imagePlaceholder = require('../../../../publics/image/ImagePlaceholder.jpg')

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Image source={avatar ? avatar : imagePlaceholder} style={styles.image} />
        <TouchableOpacity onPress={() => editPhotoHandler()}>
          <Icon type="AntDesign" name="camerao" style={{fontSize: 32, color: '#555'}} />
        </TouchableOpacity>
      </View>
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
