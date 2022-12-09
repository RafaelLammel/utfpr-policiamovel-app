import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 30,
    color: 'white'
  },
  inputBox: {
    borderColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    padding: 10,
    color: 'white'
  },
  loginButton: {
    backgroundColor: '#606060',
    width: '80%',
    padding: 10,
    borderRadius: 10
  },
  loginText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
});
