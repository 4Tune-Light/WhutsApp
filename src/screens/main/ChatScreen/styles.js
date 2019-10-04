import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: '#DDD',
	},
	inputContainer: {
		position: 'absolute', 
		bottom: 0, 
		left: 0,

		flexDirection: 'row', 
		alignItems: 'center',
		justifyContent: 'space-between', 
		padding: 10,
	},
	input: {
		flex: 5, 
		backgroundColor: '#F4F4F4', 
		borderRadius: 25, 
		height: 50, 
		paddingLeft: 20,
		
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	button: {
		width: 50,
		height: 50,
		backgroundColor: '#0088CC',
		marginLeft: 10, 
		padding: 10,
		paddingLeft: 7,
		borderRadius: 50, 
		alignItems: 'center', 
		justifyContent: 'center',

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	textContainer: {
		flexDirection: 'row',
		width: '60%',
		borderRadius: 5, 
		marginBottom: 15 
	},
	text: {
		color: '#F4F4F4',
		padding: 7,
		fontSize: 16
	},
	time: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		color: '#eee', 
		padding: 3,
		fontSize: 12
	}

})