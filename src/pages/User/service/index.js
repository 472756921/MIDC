import { api } from '../../../utils/config';
import request from '../../../utils/request';
import {getParmas} from '../../../utils';

const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

export function query (data) {
  let url = getParmas( api.userList, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function userDel (data) {
  let url = getParmas( api.userDel, data);
  return request(url, {method: 'delete', headers: JSONS});
}
export function save (data) {
  return request(api.userSave, {method: 'post', headers: JSONS, body: JSON.stringify(data)});
}
