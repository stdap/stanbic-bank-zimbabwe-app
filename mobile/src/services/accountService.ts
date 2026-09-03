import api from './api';

export const accountService = {
  async getAccounts() {
    const response = await api.get('/accounts');
    return response.data;
  },

  async getAccountById(id: string) {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  },

  async getAccountBalance(id: string) {
    const response = await api.get(`/accounts/${id}/balance`);
    return response.data;
  },
};
