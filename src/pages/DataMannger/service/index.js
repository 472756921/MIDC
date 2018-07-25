import { api } from '../../../utils/config';
import request from '../../../utils/request';
import {getParmas} from '../../../utils';

const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

export function query (data) {
  let url = getParmas( api.dataList, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function add (data) {
  return request(api.addData, {method: 'post', headers: JSONS, body: JSON.stringify(data)});
}
