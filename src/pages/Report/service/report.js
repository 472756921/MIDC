import {api} from "../../../utils/config";
import request from "../../../utils/request";
const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

// export function searchData (data) {
//   let url = getParmas( api.searchData, data);
//   return request(url, {method: 'get', headers: JSONS});
// }
export function searchData (data) {
  return request(api.searchData3, {method: 'post', body: JSON.stringify(data), headers: JSONS});
}
export function queryCount (data, type) {
  return request(api.reportChart + '?type='+type, {method: 'post', body: JSON.stringify(data), headers: JSONS});
}
