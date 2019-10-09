import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    color: '#EEE',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: '80%',
    backgroundColor: '#EEE',
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 12,
    paddingLeft: 20,
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 20
  },
  login: {
    color: '#0088CC',
    fontSize: 18,
  },
  register: {
    marginTop: 20,
    color: '#EEE'
  }
})