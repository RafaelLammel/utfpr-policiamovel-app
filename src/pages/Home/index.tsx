import React, {useContext, useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity, View
} from 'react-native';
import AuthContext from '../../contexts/auth';
import {styles} from './styles';
import {LOCATION_TASK_NAME} from "../../consts/taskNames";
import {
  Accuracy, hasStartedLocationUpdatesAsync,
  requestBackgroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync
} from "expo-location";
import {isBatteryOptimizationEnabledAsync} from "expo-battery";

const HomePage = () => {

  const {signOut} = useContext(AuthContext);

  const [isBatteryModalVisible, setBatteryModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const foregroundStatus = await requestForegroundPermissionsAsync();
      const backgroundStatus = await requestBackgroundPermissionsAsync();

      const taskHasStarted = await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

      const isBatteryOptimizationEnabled = await isBatteryOptimizationEnabledAsync();
      if(isBatteryOptimizationEnabled)
        setBatteryModalVisible(true);

      if (foregroundStatus.status === 'granted' && backgroundStatus.status === 'granted' && !taskHasStarted)
        await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Accuracy.Highest,
          timeInterval: 2000,
          distanceInterval: 5,
          foregroundService: {
            killServiceOnDestroy: false,
            notificationBody: "Sua localização está sendo enviada",
            notificationTitle: "Enviando Localização",
            notificationColor: "#0000bd"
          }
        });
    })();
  }, []);

  const handleSignOut = async () => {
    const taskHasStarted = await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

    if(taskHasStarted)
      await stopLocationUpdatesAsync(LOCATION_TASK_NAME);

    signOut();
  }

  const BatteryModal = () => (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isBatteryModalVisible}
      onRequestClose={() => setBatteryModalVisible(!isBatteryModalVisible)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Foi detectado que o aplicativo está sendo executado em modo de otimização de bateria.{'\n\n'}
            Por favor, vá até as configurações do seu aparelho móvel e desative a otimização de bateria
            do aplicativo 'policiamovel' para que sua localização seja rastreada com maior precisão.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setBatteryModalVisible(!isBatteryModalVisible)}
          >
            <Text style={styles.textStyle}>Fechar Popup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <BatteryModal />
      <Text style = {styles.homeText}>Sua localização está sendo enviada</Text>
      <TouchableOpacity style = {styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default HomePage;

