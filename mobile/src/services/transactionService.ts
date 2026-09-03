import api from './api';

interface TransferRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
}

interface BillPaymentRequest {
  accountId: string;
  provider: string;
  amount: number;
  customerReference: string;
  description: string;
}

export const transactionService = {
  async getTransactions(limit = 20, offset = 0) {
    const response = await api.get('/transactions', {
      params: { limit, offset },
    });
    return response.data;
  },

  async createTransfer(data: TransferRequest) {
    const response = await api.post('/transactions/transfer', data);
    return response.data;
  },

  async payBill(data: BillPaymentRequest) {
    const response = await api.post('/transactions/bill-payment', data);
    return response.data;
  },
};
