import {StyleSheet} from 'react-native';

export const styles =  StyleSheet.create({
    container: {
      backgroundColor: 'blue',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    homeText:{
      color: 'white'
    },
    logoutButton: {
      backgroundColor: '#606060',
      width: '80%',
      padding: 10,
      borderRadius: 10,
      marginTop: 50
    },
    logoutText: {
      textAlign: 'center',
      color: 'white'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "left"
    }
  })
  