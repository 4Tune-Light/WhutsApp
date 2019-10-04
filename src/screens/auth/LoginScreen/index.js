import Firebase from '../../../publics/Firebase'
import React, { useState } from 'react'
import styles from './styles'
import { Text, TextInput, View, Button, ToastAndroid, AsyncStorage } from 'react-native'

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
              Firebase.database().ref('users/' + phone).update({status: true})
              AsyncStorage.setItem('userStatus', '1')
              AsyncStorage.setItem('userName', person.name)
              AsyncStorage.setItem('key', phone)
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
    <View style={styles.container}>
      <Text>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => props.navigation.navigate('Register')}
      />
    </View>
  )
}

export default LoginScreen