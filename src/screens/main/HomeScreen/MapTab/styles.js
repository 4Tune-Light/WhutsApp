import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
	},
	image: {
		width: 175,
		height: 175,
		borderRadius: 100,
		marginBottom: 20,
	},
	statusContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	circle: {
		height: 12, 
		width: 12, 
		borderRadius: 15,
		marginRight: 5 
	},
	status: {
		fontWeight: 'bold',
		fontSize: 20,	
	},
	name: {
		fontWeight: 'bold',
		fontSize: 25,
		color: '#555',
		marginBottom: 150,
		marginRight: 10
	},
	icon: {
		marginTop: 10,
		color: '#555'
	},
	check: {
		marginRight: 5,
		color: 'green'
	},
	close: {
		color: 'red'
	},
	button: {
		justifyContent: 'center', 
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#0088CC'
	},
	buttonText: {
		fontWeight: 'bold',
		fontSize: 20,
		color: 'white'
	}
})