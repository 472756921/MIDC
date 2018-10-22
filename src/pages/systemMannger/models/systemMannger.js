/* global window */
import {getSLData, saveData, del, getCfData, saveYa, saveCFData, delCFData, brList, yarList, cdList, search} from "../service/systemMannger";
import { addPatient } from '../../InformationCollection/services/InformationCollection';
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
    totalElements: '',
    selectData: [],
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
      if(payload.type === 'cf'){
        const {data = []}  = yield call(getCfData, {name:''});
        yield put({type: 'setData2', payload: {data, type:payload.type}});
      } else if(payload.type === 'br') {
        if(!payload.page) {
          payload.page = 1;
          payload.pageSize = 30;
          payload.searchV = ''
        }
        const d  = yield call(brList, payload);
        let data = d.data.content;
        yield put({type: 'setData2', payload: {data, type:payload.type}});
        yield put({type: 'settotalElements', payload: {totalElements: d.data.totalElements}});
      } else if(payload.type === 'ya') {
        if(!payload.page) {
          payload.page = 1;
          payload.pageSize = 30;
          payload.name = ''
          payload.visitDate = ''
        }
        const d  = yield call(yarList, payload);
        if(!d.data.content){
          message.error('查询失败，请稍后再试');
          return
        }
        let data = d.data.content;
        yield put({type: 'setData2', payload: {data, type:payload.type}});
        yield put({type: 'settotalElements', payload: {totalElements: d.data.totalElements}});
      } else if(payload.type === 'cd') {
        if(!payload.sysType) {
          payload.sysType = 'cdd';
        }
        let {data = []}  = yield call(cdList, {sysType: payload.sysType});
        if(data && data.success === false) {
          data = [];
        }
        yield put({type: 'setData', payload: {data, type:payload.type}});
      } else {
        let {data = []}  = yield call(getSLData, payload);
        if(data && data.success === false) {
          data = [];
        }
        yield put({type: 'setData', payload: {data, type:payload.type}});
      }
    },
    *selectData({payload}, {call, put, select}) {
      const {data = []}  = yield call(getSLData, payload);
      yield put({type: 'changeSelectData', data});
    },
    *selectDataByCd({payload}, {call, put, select}) {
      const {data = []}  = yield call(cdList, {sysType: payload.type});
      yield put({type: 'changeSelectData', data});
    },
    *search({vname}, {call, put, select}) {
      const {lsitData} = yield select(_=>_.systemMannger);
      const data = lsitData.filter((it) => it.name === vname);
      yield put({type: 'changeTableData', data});
    },
    *del({itemData}, {call, put, select}) {
      let delData = {
        id: itemData.id,
      }
      const {data}  = yield call(del, delData);
      if(data.success){
        message.success('删除成功');
        const {nowType} = yield select(_=>_.systemMannger);
        yield put({type: 'getData', payload:{type: nowType}});
      } else {
        message.error('删除失败');
      }
    },
    *delCFData({itemData}, {call, put, select}) {
      let delData = {
        id: itemData.id,
      }
      const {data}  = yield call(delCFData, delData);
      if(data.status === 200){
        message.success('删除成功');
        const {nowType} = yield select(_=>_.systemMannger);
        yield put({type: 'getData', payload:{type: nowType}});
      } else {
        message.error('删除失败');
      }
    },
    *saveData({payload}, {call, put, select}) {
      const {itemData} = yield select(_=>_.systemMannger);
      const {data} = yield call(saveData, itemData);
      if(data.success){
        message.success('保存成功');
        const {nowType} = yield select(_=>_.systemMannger);
        yield put({type: 'getData', payload:{type: nowType}});
      } else {
        message.error('保存失败，请稍后再试');
      }
    },
    *saveTableData({payload}, {call, put, select}) {
      const {itemData} = yield select(_=>_.systemMannger);
      if(payload.type === 'cf') {
        const {data}  = yield call(saveCFData, payload);
        if(data.status === 200){
          message.success('保存成功');
          yield put({type: 'modelShow', payload:{modelShow: false, itemData: itemData}});
        } else {
          message.error(data.msg);
        }
      } else if(payload.type === 'br'){
        const {data}  = yield call(addPatient, payload);
        if(data.status === 200){
          message.success('保存成功');
          yield put({type: 'modelShow', payload:{modelShow: false, itemData: itemData}});
          yield put({type: 'getData', payload:{type: 'br'}});
        } else {
          message.error(data.msg);
        }
      } else {
        yield call(saveData, payload);
      }
    },
    *saveDataYA({payload}, {call, put, select}) {
      const {itemData} = yield select(_=>_.systemMannger);
      const {tempData} = yield select(_=>_.systemMannger);
      const {tempData2} = yield select(_=>_.systemMannger);
      let Sdata = Object.assign(tempData, tempData2);
      Sdata.visitId = itemData.visitId
      const {data}  = yield call(saveYa, Sdata);
      if(data.status === 200){
        message.success('保存成功');
        yield put({type: 'modelShow', payload:{modelShow: false, itemData: itemData}});
        yield put({type: 'getData', payload:{type: 'ya'}});
      } else {
        message.error(data.msg);
      }
    },
    *serchaYA({payload}, {call, put, select}){
      const {date} = yield select(_=>_.systemMannger);
      payload.date = date;
      yield call(search, payload);
    },
    *serchaBR({payload}, {call, put, select}){
      yield call(search, payload);
    },
  },
  reducers: {
    setData (state,{payload}) {
      return {...state, lsitData: payload.data, nowType: payload.type, itemData: '' }
    },
    settotalElements (state,{payload}) {
      return {...state, totalElements: payload.totalElements}
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
    },
    changeSelectData(state, {data}) {
      return {...state, selectData: data}
    }
  },
}
