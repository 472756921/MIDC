/* global window */
import {getSLData, saveData, del, search} from "../service/systemMannger";
import { message } from 'antd';

export default {
  namespace: 'systemMannger',
  state: {
    lsitData: [],
    nowType: 'cdm',
    itemData: '',
    cltype: '',
    tableItem: [],
    modelShow: false,
    temp: false,
    tempData: '',
    tempData2: '',
    date: '',
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
      if(payload.type === 'cf' || payload.type === 'br' || payload.type === 'ya' || payload.type === 'cd') {
        yield put({type: 'setData2', payload: {data, type:payload.type}});
      } else {
        yield put({type: 'setData', payload: {data, type:payload.type}});
      }
    },
    *search({vname}, {call, put, select}) {
      const {lsitData} = yield select(_=>_.systemMannger);
      const data = lsitData.filter((it) => it.name === vname);
      yield put({type: 'changeTableData', data});
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
    *saveTableData({payload}, {call, put, select}) {
      const {data}  = yield call(saveData, payload);
      const {itemData} = yield select(_=>_.systemMannger);
      if(data.code === 200){
        message.success('保存成功');
        yield put({type: 'modelShow', payload:{modelShow: false, itemData: itemData}});
      } else {
        message.error(data.msg);
      }
    },
    *saveDataYA({payload}, {call, put, select}) {
      const {itemData} = yield select(_=>_.systemMannger);
      const {tempData} = yield select(_=>_.systemMannger);
      const {tempData2} = yield select(_=>_.systemMannger);
      let Sdata = Object.assign(tempData, tempData2);
      const {data}  = yield call(saveData, Sdata);
      if(data.code === 200){
        message.success('保存成功');
        yield put({type: 'modelShow', payload:{modelShow: false, itemData: itemData}});
      } else {
        message.error(data.msg);
      }
    },
    *serchaYA({payload}, {call, put, select}){
      const {date} = yield select(_=>_.systemMannger);
      payload.date = date;
      const {data}  = yield call(search, payload);
    },
    *serchaBR({payload}, {call, put, select}){
      const {data}  = yield call(search, payload);
    },
  },
  reducers: {
    setData (state,{payload}) {
      return {...state, lsitData: payload.data, nowType: payload.type, itemData: '' }
    },
    setData2 (state,{payload}) {
      return {...state, lsitData: payload.data, nowType: payload.type, tableItem: payload.data }
    },
    changeItemData (state, payload) {
      return {...state, itemData: payload.itemData, cltype: payload.cltype }
    },
    changeTableData (state, payload) {
      return {...state, tableItem: payload.data }
    },
    modelShow (state, {payload}) {
      return {...state, modelShow: payload.modelShow, itemData: payload.itemData }
    },
    modelCon (state, {payload}) {
      return {...state, modelShow: payload.modelShow }
    },
    temp (state, {payload}) {
      return {...state, temp: payload.temp }
    },
    tempData (state, {postData}) {
      return {...state, tempData: postData, temp: false}
    },
    tempData2 (state, {payload}) {
      return {...state, tempData2: payload, temp: true}
    },
    changeDate(state, {payload}) {
      return {...state, date: payload.date}
    }
  },
}
