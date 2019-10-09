import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import Firebase from '../../Firebase'
import React, { useState, useEffect } from 'react'
import { Icon } from 'native-base'

const Header = props => {
	const [ phone, setPhone ] = useState('')
	const [ status, setStatus ] = useState(false)
	const { title, back, goBack, name, image, getParam, navigate, photo } = props
	const imagePlaceholder = require('../../../publics/image/ImagePlaceholder.jpg')

	useEffect(() => {
		if (getParam) {
			setPhone(getParam('phone'))
		}
	}, [])

	useEffect(() => {
		if (phone.length > 0) {
			Firebase.database().ref('users/' + phone).once('value', val => {
				const person = val.val()
				setStatus(person.status)
			})
		}
	}, [phone])

	useEffect(() => {
		Firebase.database().ref('users/' + phone).on('child_changed', val => {
			let person = val.val()
			setStatus(person.status)
		})
	})

	return(
		<View style={styles.container}>
			<StatusBar backgroundColor='#426482' barStyle="light-content" />
		{ goBack &&
			<TouchableOpacity onPress={() => goBack()}>
				<Icon type='Ionicons' name='md-arrow-round-back' style={styles.backIcon}/>
			</TouchableOpacity>
		}
		{	title &&
			<View>
				<Text style={styles.title}>
					{title}
				</Text>
			</View>
		}
		<TouchableOpacity style={styles.touchContainer} onPress={() => props.navigate('Profile', {phone})}>
		{	image === true &&
			<View>
				<Image resizeMode='cover' style={styles.image} source={photo ? {uri: photo} : imagePlaceholder} />
			</View>
		}

		{	name &&
			<View style={styles.nameContainer}>
				<Text style={styles.name}>
					{name}
				</Text>
				<Text style={styles.status}>
					{status === '1' ? 'online' : ''}
				</Text>
			</View>
		}
		</TouchableOpacity>
			
		</View>
	)
}  

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0088CC',
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		paddingLeft: 5,
		paddingVertical: 10,
		top: 0,
		left: 0,
		right: 0,
		height: 60,
	},
	title: {
		color: '#EEE',
		fontWeight: 'bold',
		fontSize: 25,
		marginLeft: 10,
	},
	backIcon: {
		color: 'white',
		fontSize: 30,
		marginLeft: 10
	},
	touchContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	image: {
	  width: 40, 
	  height: 40, 
	  borderRadius: 50,
	  marginLeft: 15
	},
	nameContainer:{
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginLeft: 10,
	},
	name: {
		color: '#EEE',
		fontWeight: 'bold',
		fontSize: 20,
	},
	status: {
		color: '#EEE',
		fontSize: 15
	}
})

export default Header