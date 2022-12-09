import axios, { AxiosError } from 'axios';
import { LoginRequest } from '../interfaces/requests/LoginRequest';
import { LoginResponse } from '../interfaces/responses/LoginResponse';
import { LoginErrorResponse } from '../interfaces/responses/LoginErrorResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationRequest } from '../interfaces/requests/LocationRequest';

const api = axios.create({
  baseURL: '',
});


export async function login(
  loginRequest: LoginRequest,
): Promise<LoginResponse | LoginErrorResponse> {
  try {
    const response = await api.post(
      '/api/v1/authentication/login',
      loginRequest,
    );

    return response.data as LoginResponse;
  } catch (error) {
    const e = error as AxiosError;

    if (e.response?.status === 500) {
      return {
        errorMsgs: ['Algo deu errado no servidor! Tente novamente mais tarde'],
      };
    } else if (e.response?.status === 404) {
      return { errorMsgs: ['Login ou senha incorretos!'] };
    }

    const loginErrorResponse: LoginErrorResponse = {
      errorMsgs: [],
    } as LoginErrorResponse;
    const errors: any = e.response?.data;

    Object.values(errors.errors).forEach(value => {
      const errorList = value as string[];
      errorList.forEach(v => loginErrorResponse.errorMsgs.push(v));
    });

    return loginErrorResponse;
  }
}


export async function putLocation(locationRequest: LocationRequest) {
  try {
    const storedUserId = await AsyncStorage.getItem('@auth:userId');
    const storedToken = await AsyncStorage.getItem('@auth:token');

    const res = await api.put(
      '/api/v1/Location/' + storedUserId,
      locationRequest,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        },
        timeout: 1500
      }
    );

    return res.status;
  }
  catch (error) {
    const e = error as AxiosError;

    if (e.response?.status == 401) {
      return e.response?.status;
    }
  }
}
