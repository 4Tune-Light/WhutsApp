import { Text, TextInput, View, Button, ToastAndroid, AsyncStorage, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Firebase from '../../../publics/Firebase'
import React, { useState } from 'react'
import styles from './styles'

const LoginScreen = props => {
  const [ phone, setPhone ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  const handleLogin = () => {
    if (phone == '') {
      ToastAndroid.show('Please insert your phone number', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } else if (password == '') {
      ToastAndroid.show('Please insert your password', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } else {
      Firebase.database().ref('users/' + phone)
        .once('value', (val) => {
          const person = val.val()
          if (person) {
            if (person.password === password) {
              Firebase.database().ref('users/' + phone).update({status: '1'})
              AsyncStorage.setItem('key', phone)
              AsyncStorage.setItem('userStatus', '1')
              AsyncStorage.setItem('userName', person.name)
              ToastAndroid.show('Login Success', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
              setTimeout(() => props.navigation.navigate('Home'), 1500)
            } else {
              ToastAndroid.show('Wrong Email or Password', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
          } else {
            ToastAndroid.show('Wrong Email or Password', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
          }
        })
          
    }

    
  }

  return (
    <LinearGradient
        colors={['#147ED3', '#46A4D3']}
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, padding: 10, paddingTop: 75, justifyContent: 'center'}}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Login to WhutsApp</Text>
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
        onPress={handleLogin}
      >
        <Text style={styles.login} >LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Register')}
      >
        <Text style={styles.register}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

    </View>
    </LinearGradient>
  )
}

export default LoginScreen