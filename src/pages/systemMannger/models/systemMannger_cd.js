/* global window */
import {getSLData, saveData, del, search, cdList, cdSave, delCd} from "../service/systemMannger";
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
      const {data = []}  = yield call(cdList, {sysType: payload.type});
      yield put({type: 'setData', payload: {data, type:payload.type}});
    },
    *saveTableData({payload}, {call, put, select}) {
      console.log(payload);
      const {data}  = yield call(cdSave, payload);
      if(data.status === 200){
        message.success('保存成功');
        yield put({type: 'modelShow', payload:{modelShow: false, itemData: ''}});
        const {nowType} = yield select(_=>_.systemMannger_cd)
        yield put({type: 'getData', payload:{type:nowType}});
      } else {
        message.error(data.msg);
      }
    },
    *del({itemData}, {call, put, select}) {
      let delData = {
        id: itemData.id,
        sysType: itemData.sysType,
      }
      const {data}  = yield call(delCd, delData);
      if(data.status === 200){
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
