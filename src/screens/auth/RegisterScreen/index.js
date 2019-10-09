import { Text, TextInput, View, Button, AsyncStorage, ToastAndroid, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import React, { useState, useEffect } from 'react'
import Firebase from '../../../publics/Firebase'
import styles from './styles'

const RegisterScreen = props => {
  const [ phone, setPhone ] = useState('')
  const [ exist, setExist ] = useState(null)
  const [ password, setPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  const handleSignUp = () => {
    if (phone == '') {
      ToastAndroid.show('Please insert your phone number', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } else if (password == '') {
      ToastAndroid.show('Please insert your password', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } else {
      Firebase.database().ref('users/' + phone)
        .once('value', (val) => {
          const person = val.val()
          if (person) {
            ToastAndroid.show('Phone number alredy registered', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            setExist(true)
          } else {
            setExist(false)
          }
        })
    }
  }

  useEffect(() => {
    if (exist == false) {
      AsyncStorage.setItem('key', phone)
      AsyncStorage.setItem('userStatus', '1')
      AsyncStorage.setItem('userName', phone)
      Firebase.database().ref('users/'+ phone).set({name: phone, password, phone})
      props.navigation.navigate('Home')
    }
  }, [exist])

  return (
    <LinearGradient
        colors={['#147ED3', '#46A4D3']}
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, padding: 10, paddingTop: 75, justifyContent: 'center'}}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Register to WhutsApp</Text>
      <TextInput
        style={styles.textInput}
        keyboardType='numeric'
        placeholder="Phone Number"
        onChangeText={phone => setPhone(phone)}
        value={phone}
      />
      <TextInput
        secureTextEntry
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={password => setPassword(password)}
        value={password}
      />

      <TouchableOpacity
        style={styles.loginContainer}
        onPress={handleSignUp}
      >
        <Text style={styles.login} >SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
      >
        <Text style={styles.register}>Alredy have an account? Sign In</Text>
      </TouchableOpacity>

    </View>
    </LinearGradient>
  )
}

export default RegisterScreen