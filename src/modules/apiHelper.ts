import axios from 'axios';
import type { TApiTypes } from '../@types/api.types';
const instance = axios.create({
  baseURL: 'https://api.asyncpay.io/v1/sdk',
});

const requests: TApiTypes = {
  initializePayment: (payload, config) =>
    instance.post('/initialize-payment-request', payload, config),
};

export default requests;
