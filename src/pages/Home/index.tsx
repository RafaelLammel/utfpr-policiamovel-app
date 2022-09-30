import React, {useContext, useEffect} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AuthContext from '../../contexts/auth';
import Geolocation from 'react-native-geolocation-service';
import BackgroundService from 'react-native-background-actions';
import {styles} from './styles';

import { putLocation } from '../../services/api';
import { LocationRequest } from '../../interfaces/requests/LocationRequest';

const HomePage = () => {
  const {signOut} = useContext(AuthContext);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  const options = {
    taskName: 'PoliciaMovelLocation',
    taskTitle: 'PoliciaMovelApp',
    taskDesc: 'Sua Localização está sendo enviada',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
        delay: 5000,
    },
  };

  const sleep = (time:any) => new Promise((resolve) => setTimeout(() => resolve(), time));

  const putLocationTask = async (taskDataArguments:any) => {
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
          Geolocation.getCurrentPosition(
            async (position) => {
              const locationRequest: LocationRequest = {
                latitude: position.coords.latitude.toString(),
                longitude: position.coords.longitude.toString(),
              };
              var responseOrError = await putLocation(locationRequest);
              if(responseOrError == 401){
                await BackgroundService.stop();
                signOut();
              }
              console.log(locationRequest);//DEBUG
              console.log("contador: " + i)
            },
            (error) => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true }
          );
          await sleep(delay);
      }
    });
  };

  useEffect(() => {
    var granted;
    var permissionAsync = async () => {
      granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    }
    permissionAsync();
    if(granted === PermissionsAndroid.RESULTS.granted){
      (async () => {
        await BackgroundService.start(putLocationTask, options)
      })();
    }
    return () => {
      (async () => await BackgroundService.stop())();
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

