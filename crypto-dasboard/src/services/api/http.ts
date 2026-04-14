import axios from 'axios';
import { BINANCE_REST_BASE_URL } from '../../shared/constants/api';

export const http = axios.create({
  baseURL: BINANCE_REST_BASE_URL,
  timeout: 10000,
});