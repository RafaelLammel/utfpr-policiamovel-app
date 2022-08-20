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

const LoginPage = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {signIn} = useContext(AuthContext);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TextInput onChangeText={text => setLogin(text)} placeholder="Login" />
      <TextInput
        onChangeText={text => setPassword(text)}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={async () => await signIn({login, password})}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginPage;
