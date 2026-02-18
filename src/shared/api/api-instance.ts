import axios from 'axios';

const BASE_URL = '/api';

export const apiInstance = axios.create({
  baseURL: BASE_URL,
});
