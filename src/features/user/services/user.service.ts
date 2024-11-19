import { privateAxios } from '../../../lib';
import { ConfirmUserEmailRequestData } from '../types';

export const UsersService = {
  async getCurrentUser() {
    const responce = await privateAxios.get('/users/current');
    return responce.data;
  },
  async confirmUserEmail(token: ConfirmUserEmailRequestData) {
    return privateAxios.post('/users/confirm-email', token);
  },
};

// const responce = await privateAxios.get<User>('/users/current');
