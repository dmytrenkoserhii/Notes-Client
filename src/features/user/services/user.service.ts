import { privateAxios } from '../../../lib';
import {
  ConfirmUserEmailRequestData,
  UpdateAccountRequestData,
  UpdateAccountResponseData,
} from '../types';

export const UsersService = {
  async getCurrentUser() {
    const response = await privateAxios.get('/users/current');
    return response.data;
  },
  async confirmUserEmail(token: ConfirmUserEmailRequestData) {
    return privateAxios.post('/users/confirm-email', token);
  },
  async updateAccount(updateAccountData: UpdateAccountRequestData) {
    const response = await privateAxios.patch<UpdateAccountResponseData>(
      '/accounts',
      updateAccountData
    );
    console.log(response.data);
    return response.data;
  },
};
