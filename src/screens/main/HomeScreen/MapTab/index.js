import { Text, View, AsyncStorage, TouchableOpacity, Image,
         Dimensions, PermissionsAndroid, StyleSheet } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import Firebase from '../../../../publics/Firebase'
import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Icon } from 'native-base'
import styles from './styles'

const ProfileTab = props => {

  const [ users, setUsers ] = useState([])

  const [ region, setRegion ] = useState({
    latitude: -7.336605, 
    longitude: 119.0074,
    latitudeDelta: 50,
    longitudeDelta: 50,
  })

  const geoConfig = {
    timeout: 5000,
    enableHighAccuracy: false
  }

  const imagePlaceholder = require('../../../../publics/image/ImagePlaceholder.jpg')

  const getLocation = async () => {
    const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
    
    Promise.all(granted).then(() => {
      if (granted == 'granted' || granted == true) {
        Geolocation.getCurrentPosition(
          info => {
            setRegion({
              latitude: info.coords.latitude, 
              longitude: info.coords.longitude, 
              longitudeDelta: 0.0075, 
              latitudeDelta: 0.0075
            })
            AsyncStorage.getItem('key').then(key => {
              Firebase.database().ref('users/'+ key).update({latitude: info.coords.latitude, longitude: info.coords.longitude})
            })
          }, 
          error => null,
          geoConfig
        )
      }
    })
    
  }

  const getMarker = () => {
    Firebase.database().ref('users')
      .on('child_added', val => {
        const value = val.val()
        setUsers(prevState => [...prevState, value])
      })
  }

  useEffect(() => {
    getLocation()
    getMarker()
  }, [])

  const styles = StyleSheet.create({
    marker: {
      width: 35, 
      height: 35, 
      borderRadius: 35, 
      borderWidth: 2, 
      borderColor: 'green'
    }
  })

  const {width, height} = Dimensions.get('window')
  return (
    <View style={styles.container}>
      <MapView
        style={{width, height: height - 120}}
        region={region}
        zoomEnabled={true}
      >
        {users.map(user => {
          return(
            <MapView.Marker coordinate={{latitude: user.latitude, longitude: user.longitude}} title={user.name} description={user.status == '1' ? 'online' : 'offline'}>
              <View>
                <Image style={{...styles.marker, borderColor: user.status == '1' ? 'green' : '#555' }} source={user.photo ? {uri: user.photo} : imagePlaceholder} resizeMode="cover"/>
              </View>
            </MapView.Marker>
          )
        })

        }

        
      </MapView>
    </View>
  )
}

export default ProfileTab
