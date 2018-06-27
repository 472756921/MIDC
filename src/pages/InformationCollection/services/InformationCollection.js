import { api } from '../../../utils/config';
import request from '../../../utils/request';
import {getParmas} from '../../../utils';

const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

export function query (data) {
  let url = getParmas( api.patientList, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function queryPatient (data) {
  let url = getParmas( api.queryPatient, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function addPatient (data) {
  return request(api.addPatient, {method: 'post', headers: JSONS, body: JSON.stringify(data)});
}
export function addRec (data) {
  return request(api.addRec, {method: 'post', headers: JSONS, body: JSON.stringify(data)});
}
