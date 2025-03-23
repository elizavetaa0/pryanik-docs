import { ILoginRequest, ILoginResponse } from '../types/apiTypes';
import { API_CONFIG } from '../../app/config/config';
import { mockAuthData } from './mocks/mocks';

const { BASE_URL, AUTH_ENDPOINT, USE_MOCKS } = API_CONFIG;

export const getLogin = async (data: ILoginRequest): Promise<ILoginResponse> => {
  if (USE_MOCKS) {
    if (mockAuthData[data.username] && data.password === 'password') {
      return { token: mockAuthData[data.username].token };
    } else {
      throw new Error('Неверные учетные данные');
    }
  }

  const response = await fetch(`${BASE_URL}${AUTH_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const result = await response.json();
  return result.data;
};
