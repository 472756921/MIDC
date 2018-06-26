/* global window */
import {getSLData, saveData} from "../service/systemMannger";
import { message } from 'antd';

export default {
  namespace: 'systemMannger',
  state: {
    lsitData: [],
    nowType: 'cdm',
    itemData: '',
    cltype: '',
  },
  subscriptions: {
    setUp({dispatch, history}) {
      history.listen((location) => {
        if(location.pathname === '/systemMannger'){
          dispatch({type: 'getData', payload:{type: 'cdm'}});
        }
      })
    }
  },
  effects: {
    *getData({payload}, {call, put, select}) {
      const {data}  = yield call(getSLData, payload);
      yield put({type: 'setData', payload: {data, type:payload.type}});
    },
    *saveData({payload}, {call, put, select}) {
      const {itemData} = yield select(_=>_.systemMannger);
      const {data}  = yield call(saveData, itemData);
      console.log(data.code === 200);
      if(data.code === 200){
        message.success('保存成功');
      } else {
        message.error(data.msg);
      }
    },
  },
  reducers: {
    setData (state,{payload}) {
      return {...state, lsitData: payload.data, nowType: payload.type, itemData: '' }
    },
    changeItemData (state, payload) {
      return {...state, itemData: payload.itemData, cltype: payload.cltype }
    },
  },
}
