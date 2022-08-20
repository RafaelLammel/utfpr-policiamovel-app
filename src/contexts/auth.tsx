import React, {createContext, useEffect, useState} from 'react';
import {login} from '../services/api';
import {LoginRequest} from '../interfaces/requests/LoginRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginResponse} from '../interfaces/responses/LoginResponse';

interface AuthData {
  signed: boolean;
  user: LoginResponse | null;
  loading: boolean;
  signIn(loginRequest: LoginRequest): Promise<void>;
  signOut(): void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedToken = await AsyncStorage.getItem('@auth:token');

      if (storagedToken) {
        setUser({accessToken: storagedToken});
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(loginRequest: LoginRequest) {
    setLoading(true);

    const response = await login(loginRequest);

    if ('accessToken' in response) {
      const userResponse = response as LoginResponse;

      setUser(userResponse);

      await AsyncStorage.setItem('@auth:token', userResponse.accessToken);
    }

    setLoading(false);
  }

  function signOut() {
    setLoading(true);

    AsyncStorage.clear().then(() => {
      setUser(null);
      setLoading(false);
    });
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
