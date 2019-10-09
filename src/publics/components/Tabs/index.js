import ProfileTab from '../../../screens/main/HomeScreen/ProfileTab'
import ChatTab from '../../../screens/main/HomeScreen/ChatTab'
import MapTab from '../../../screens/main/HomeScreen/MapTab'
import { View, Text, StyleSheet } from 'react-native'
import { Tabs, Tab, TabHeading } from 'native-base'
import React, { useState } from 'react'

const MultiTabs = props => {
	const [ currentTab, setCurrentTab ] = useState(1)
	return(
		<View style={styles.container}>
			<Tabs 
				initialPage={currentTab} 
				tabContainerStyle={styles.tabs}
				onChangeTab={({ i }) => setCurrentTab(i)}
  		>
				<Tab heading={<TabHeading style={styles.tabHeading}><Text style={{...styles.tabHeadingText, color: currentTab === 0 ? '#EEE' : 'rgba(220,220,220,0.5)'}}>PROFILE</Text></TabHeading>} ><ProfileTab navigate={props.navigate}/></Tab>
				<Tab heading={<TabHeading style={styles.tabHeading}><Text style={{...styles.tabHeadingText, color: currentTab === 1 ? '#EEE' : 'rgba(220,220,220,0.5)'}}>CHATS</Text></TabHeading>}><ChatTab navigate={props.navigate}/></Tab>
				<Tab heading={<TabHeading style={styles.tabHeading}><Text style={{...styles.tabHeadingText, color: currentTab === 2 ? '#EEE' : 'rgba(220,220,220,0.5)'}}>MAP</Text></TabHeading>} ><MapTab /></Tab>
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