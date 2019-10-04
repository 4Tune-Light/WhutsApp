import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
	},
	card: {
	  flex: 1, 
	  flexDirection: 'row',
	  alignItems: 'center',

	  paddingHorizontal: 15,
	},
	image: {
	  width: 55, 
	  height: 55, 
	  borderRadius: 50,
	  marginRight: 15
	},
	nameContainer: {
		flex: 1,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderColor: '#CFCFCF'
	},
	name: {
	  fontWeight: 'bold',
	  fontSize: 18,

	  marginBottom: 5,
	},
	chat: {
	  color: '#555',
	  fontSize: 15
	}
})