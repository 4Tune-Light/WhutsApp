import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  }
})