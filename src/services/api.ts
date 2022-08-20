import axios from 'axios';
import {LoginRequest} from '../interfaces/requests/LoginRequest';
import {LoginResponse} from '../interfaces/responses/LoginResponse';
import {LoginErrorResponse} from '../interfaces/responses/LoginErrorResponse';

const api = axios.create({
  baseURL: 'https://api.tccpm.tk',
});

export async function login(
  loginRequest: LoginRequest,
): Promise<LoginResponse | LoginErrorResponse> {
  const response = await api.post('/api/v1/authentication/login', loginRequest);

  if (response.status === 200) {
    return response.data as LoginResponse;
  }

  if (response.status === 500) {
    return {errorMsgs: ['Algo deu errado no servidor!']};
  }

  const loginErrorResponse: LoginErrorResponse = {
    errorMsgs: [],
  } as LoginErrorResponse;
  const errors: any = response.data.errors;

  Object.values(errors).forEach(value => {
    loginErrorResponse.errorMsgs.concat(value as string[]);
  });

  return loginErrorResponse;
}
