import { View, Text, TextInput, AsyncStorage, TouchableOpacity,
 StyleSheet, FlatList, Dimensions, ImageBackground } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Header from '../../../publics/components/Header'
import React, { useState, useEffect } from 'react'
import Firebase from '../../../publics/Firebase'
import { Icon } from 'native-base'
import firebase from 'firebase'
import styles from './styles'

const ChatScreen = props => {
	const [ messages, setMessages ] = useState([])
	const [ message, setMessage ] = useState(null)
	const [ name, setName ] = useState(null)
	const [ phone, setPhone ] = useState(null)
	const [ key, setKey ] = useState(null)
	const [ fulfilled, setFulfilled ] = useState(false)

	const sendMessage = () => {
		if (message) {
			Promise.all([name, phone]).then(() => {
				AsyncStorage.getItem('key').then(userKey => {
					let msgId = Firebase.database().ref('messages').child(userKey).child(phone).push().key
					let updates = {}
					let chatMessage = {
						message,
						time: firebase.database.ServerValue.TIMESTAMP,
						from: userKey
					}
					updates['messages/' + userKey + '/' + phone + '/' + msgId] = chatMessage;
					updates['messages/' + phone + '/' + userKey + '/' + msgId] = chatMessage;	
					Firebase.database().ref().update(updates)
					setMessage(null)				
				})
			})
		}
	}

	const convertTime = time => {
		const d = new Date(time)
		const c = new Date()
		let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':'
		result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()

		if (c.getDay() !== d.getDay()) {
			result = d.getDate() + '/' + d.getMonth() + ' ' + result 
		}
		return result
	}

	const renderRow = ({ item }) => {
		return(
			<View style={
					{...styles.textContainer, 
						alignSelf: item.from == key ? 'flex-end' : 'flex-start', 
						backgroundColor: item.from == key ? '#6CC1E3' : '#F4F4F4', 
					}
				}
			>
				<Text style={{...styles.text, color: item.from == key ? '#F4F4F4' : '#444'}}> {item.message} </Text>
				<Text style={styles.time}> {convertTime(item.time)} </Text>
			</View>
		)
	}



	useEffect(() => {
		AsyncStorage.getItem('key').then(key => setKey(key))
		setName(props.navigation.getParam('name'))
		setPhone(props.navigation.getParam('phone'))
		AsyncStorage.getItem('key').then(key => {
			Firebase.database().ref('messages').child(key).child(props.navigation.getParam('phone'))
				.on('child_added', val => {
					let message = val.val()
					setMessages(prevState => [...prevState, message])
				})
		})
	}, [])

	const background = require('../../../publics/image/ChatBackground.jpg')

	const { height, width } = Dimensions.get('window')

	return(
		<ImageBackground source={background} style={styles.container}>
		<Header 
			navigate={props.navigation.navigate}
			getParam={props.navigation.getParam}
			goBack={props.navigation.goBack}
			image={true}
			name={name}
			status={true} 
		/>
			<View>
				<FlatList
					inverted
					style={{padding: 10, marginTop: 60}}
					contentContainerStyle={{ paddingTop: 50, paddingBottom: 30 }}
					data={messages.reverse()}
					renderItem={renderRow}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
			<View style={styles.inputContainer}>
					<TextInput 
						style={styles.input}
						value={message}
						placeholder='Type a message'
						onChangeText={text => setMessage(text)}
					/>
					<TouchableOpacity style={styles.button} onPress={() => sendMessage()}><Icon type='FontAwesome' name='send-o' style={{color: 'white', fontSize: 25}} /></TouchableOpacity>
			</View>
		</ImageBackground>
	)
}

export default ChatScreen