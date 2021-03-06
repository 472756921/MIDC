import { api } from '../../../utils/config';
import request from '../../../utils/request';
import {getParmas} from "../../../utils";

const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

export function getCF (data) {
  let url = getParmas( api.getCF, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function getSLData (data) {
  let url = getParmas( api.getSLData, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function getCfData (data) {
  let url = getParmas( api.getCFData, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function del (data) {
  let url = getParmas( api.del, data);
  return request(url, {method: 'delete', headers: JSONS});
}
export function saveData (data) {
  return request(api.saveData, {method: 'post', body: JSON.stringify(data), headers: JSONS});
}
export function saveCFData (data) {
  return request(api.saveCFData, {method: 'post', body: JSON.stringify(data), headers: JSONS});
}
export function saveYa (data) {
  return request(api.saveYa, {method: 'post', body: JSON.stringify(data), headers: JSONS});
}
export function delCFData (data) {
  let url = getParmas( api.delCFData, data);
  return request(url, {method: 'delete', headers: JSONS});
}
export function search (data) {
  let url = getParmas( api.search, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function brList (data) {
  let url = getParmas( api.patientList, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function yarList (data) {
  let url = getParmas( api.getYaData, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function cdList (data) {
  let url = getParmas( api.getCdData, data);
  return request(url, {method: 'get', headers: JSONS});
}
export function cdSave (data) {
  return request(api.saveCdData, {method: 'post', body: JSON.stringify(data), headers: JSONS});
}
export function delCd (data) {
  let url = getParmas( api.delCdData, data);
  return request(url, {method: 'delete', headers: JSONS});
}
