/* global window */
import {getSLData, saveData, del} from "../service/systemMannger";
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
    *del({itemData}, {call, put, select}) {
      let delData = {
        id: itemData.id,
        sysType: itemData.sysType,
      }
      const {data}  = yield call(del, delData);
      if(data.code === 200){
        message.success('删除成功');
        const {nowType} = yield select(_=>_.systemMannger);
        yield put({type: 'getData', payload:{type: nowType}});
      } else {
        message.error(data.msg);
      }
    },
    *saveData({payload}, {call, put, select}) {
      const {itemData} = yield select(_=>_.systemMannger);
      const {data}  = yield call(saveData, itemData);
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
