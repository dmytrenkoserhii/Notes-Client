import { privateAxios, publicAxios } from '../../../lib';
import { SignInRequestData, SignUpRequestData } from '../types';

export const AuthService = {
  async signUpUser(signUpData: SignUpRequestData) {
    return publicAxios.post('/auth/sign-up', signUpData);
  },
  async signInUser(signInData: SignInRequestData) {
    return publicAxios.post('/auth/sign-in', signInData);
  },
  async logoutUser() {
    return privateAxios.get('/auth/logout');
  },
};

// return publicAxios.post<{ user: User }>('/auth/sign-up', signUpData);
