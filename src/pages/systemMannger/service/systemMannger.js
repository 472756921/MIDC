import { api } from '../../../utils/config';
import request from '../../../utils/request';
import {getParmas} from "../../../utils";

const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

export function getSLData (data) {
  let url = getParmas( api.getSLData, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function saveData (data) {
  return request(api.saveData, {method: 'post', body: JSON.stringify(data), headers: JSONS});
}
