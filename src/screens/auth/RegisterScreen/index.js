import Firebase from '../../../publics/Firebase'
import React, { useState, useEffect } from 'react'
import styles from './styles'
import { Text, TextInput, View, Button, AsyncStorage, ToastAndroid } from 'react-native'

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
      Firebase.database().ref('users/'+ phone).set({name: phone, password})
      props.navigation.navigate('Home')
    }
  }, [exist])

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <TextInput
        keyboardType='numeric'
        placeholder="Phone Number"
        style={styles.textInput}
        onChangeText={phone => setPhone(phone)}
        value={phone}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Already have an account? Login"
        onPress={() => props.navigation.navigate('Login')}
      />
    </View>
  )
}

export default RegisterScreen