import React, {useContext, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AuthContext from '../../contexts/auth';
import {styles} from './styles';
import {LoginRequest} from '../../interfaces/requests/LoginRequest';
import {LoginErrorResponse} from '../../interfaces/responses/LoginErrorResponse';

const LoginPage = () => {

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {signIn} = useContext(AuthContext);

  const validateLoginRequest = (loginRequest: LoginRequest): boolean => {
    const errors: string[] = [];

    if (loginRequest.login === '' || loginRequest.login === null) {
      errors.push('Login é obrigatório!');
    }

    if (loginRequest.password === '' || loginRequest.password === null) {
      errors.push('Senha é obrigatória!');
    }

    if (errors.length === 0) {
      return true;
    }

    Alert.alert('Erros durante o Login', errors.join('\n'));
    return false;
  };

  const handleLoginButton = async () => {
    const loginRequest: LoginRequest = {
      login: login.trim(),
      password: password.trim(),
    };

    if (!validateLoginRequest(loginRequest)) {
      return;
    }

    const res = await signIn(loginRequest);

    if (res === null) {
      return;
    }

    const errors = res as LoginErrorResponse;

    Alert.alert('Erros durante o Login', errors.errorMsgs.join('\n'));
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar barStyle={'light-content'} />
      <Text style={styles.mainText}>Polícia Móvel</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={text => setLogin(text)}
        placeholder="Login"
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.inputBox}
        onChangeText={text => setPassword(text)}
        placeholder="Senha"
        placeholderTextColor="gray"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginButton}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginPage;
