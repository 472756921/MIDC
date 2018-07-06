/* global window */
import {getSLData, saveData, del, search} from "../service/systemMannger";
import { message } from 'antd';

export default {
  namespace: 'systemMannger_cd',
  state: {
    tableItem: [],
    nowType: '',
    itemData: '',
    modelShow: false,
  },
  subscriptions: {
  },
  effects: {
    *getData({payload}, {call, put, select}) {
      const {data}  = yield call(getSLData, payload);
      yield put({type: 'setData', payload: {data, type:payload.type}});
    },
    *saveTableData({payload}, {call, put, select}) {
      const {data}  = yield call(saveData, payload);
      if(data.code === 200){
        message.success('保存成功');
        yield put({type: 'modelShow', payload:{modelShow: false, itemData: ''}});
      } else {
        message.error(data.msg);
      }
    },
    *del({itemData}, {call, put, select}) {
      let delData = {
        id: itemData.id,
        sysType: itemData.sysType,
      }
      const {data}  = yield call(del, delData);
      if(data.code === 200){
        message.success('删除成功');
        yield put({type: 'getData', payload:{type: itemData.sysType}});
      } else {
        message.error(data.msg);
      }
    },
  },
  reducers: {
    setData (state,{payload}) {
      return {...state, tableItem: payload.data, nowType: payload.type, itemData: '' }
    },
    changeDate(state, {payload}) {
      return {...state, date: payload.date}
    },
    modelShow (state, {payload}) {
      return {...state, modelShow: payload.modelShow, itemData: payload.itemData }
    },
  },
}
