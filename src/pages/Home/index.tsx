import React, {useContext, useEffect} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AuthContext from '../../contexts/auth';
import Geolocation from 'react-native-geolocation-service';
import BackgroundTimer from 'react-native-background-timer';
import {styles} from './styles';

import { putLocation } from '../../services/api';
import { LocationRequest } from '../../interfaces/requests/LocationRequest';

const HomePage = () => {
  const {signOut} = useContext(AuthContext);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };
  var cont = 0;
  useEffect(() => {
    var granted;
    var permissionAsync = async () => {
      granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    }
    permissionAsync();
    if(granted === PermissionsAndroid.RESULTS.granted){
      const intervalId = BackgroundTimer.setInterval(async () => {  
          Geolocation.getCurrentPosition(
            async (position) => {
              const locationRequest: LocationRequest = {
                latitude: position.coords.latitude.toString(),
                longitude: position.coords.longitude.toString(),
              };
              var responseOrError = await putLocation(locationRequest);
              if(responseOrError == 401){
                BackgroundTimer.clearInterval(intervalId);
                signOut();
              }
              console.log(locationRequest);//DEBUG
              console.log("contador: " + cont++)
            },
            (error) => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true }
          );
        
      }, 5000);    
    }
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style = {styles.homeText}>Sua localização está sendo enviada</Text>
      <TouchableOpacity style = {styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default HomePage;

