import axios from 'axios';
import { connectionUrl } from './globalVariables';

export const HTTP = axios.create({
  baseURL: connectionUrl,
  headers: {
    Authorization: 'Bearer {token}'
  }
})