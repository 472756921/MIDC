import { api } from '../utils/config';
import request from '../utils/request';

export function getUser (data) {
  return request(api.getUser, {method: 'get'});
}
export function loginOut (data) {
  return request(api.loginOut, {method: 'get'});
}
