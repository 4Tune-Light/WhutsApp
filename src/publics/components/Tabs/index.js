import ProfileTab from '../../../screens/main/HomeScreen/ProfileTab'
import ChatTab from '../../../screens/main/HomeScreen/ChatTab'
import { View, Text, StyleSheet } from 'react-native'
import { Tabs, Tab, TabHeading } from 'native-base'
import React from 'react'

const MultiTabs = props => {
	return(
		<View style={styles.container}>
			<Tabs 
				initialPage={1} 
				tabContainerStyle={styles.tabs}
  		>
				<Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabHeadingText}>PROFILE</Text></TabHeading>} ><ProfileTab navigate={props.navigate}/></Tab>
				<Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabHeadingText}>CHATS</Text></TabHeading>}><ChatTab navigate={props.navigate}/></Tab>
				<Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabHeadingText}>MAP</Text></TabHeading>} ></Tab>
			</Tabs>
			<View style={styles.shadow}></View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
 		marginTop: 50,
	},
	tabs: {
		elevation: 0,
	},
	tabHeading: {
		backgroundColor: '#0088CC',
	},
	tabHeadingText: {
		color: '#EEE',
		fontSize: 15,
		fontWeight: 'bold'
	},
	shadow: {
		position: 'absolute',
		top: 51,
		left: 0,
		right: 0,
		height: 5,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	}
})

export default MultiTabs