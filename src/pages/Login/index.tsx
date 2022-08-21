import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import AuthContext from '../../contexts/auth';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './styles';

const LoginPage = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {signIn} = useContext(AuthContext);

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.mainText}>Polícia Móvel</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={text => setLogin(text)}
        placeholder="Login"
      />
      <TextInput
        style={styles.inputBox}
        onChangeText={text => setPassword(text)}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={async () => await signIn({login, password})}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginPage;
