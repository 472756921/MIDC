/* global window */
import {getSLData, cdList} from "../../systemMannger/service/systemMannger";
import {getCF} from '../../systemMannger/service/systemMannger';
import {searchData, queryCount} from '../service/report';
import {message} from 'antD';
export default {
  namespace: 'report',
  state: {
    visibleA: false,
    visibleB: false,
    tableList: [],
    searchV: {},
    temp: {},
    selectData: [],
    charType: '',
    charData: '',
    cfData: [],
  },
  subscriptions: {
  },
  effects: {
    *getCF({payload}, {call, put, select}) {
      const {data}  = yield call(getCF, payload);
      yield put({type: 'setcfData', payload: data});
    },
    *selectData({payload}, {call, put, select}) {
      const {data}  = yield call(getSLData, payload);
      yield put({type: 'setSelectValue', payload: data});
    },
    *selectDataByCd({payload}, {call, put, select}) {
      const {data}  = yield call(cdList, payload);
      yield put({type: 'setSelectValue', payload: data});
    },
    *queryCount({payload}, {call, put, select}) {
      const {searchV} = yield select(_=>_.report);
      const typesList = ['zh','pc','gj','sq','ww'];
      const type = typesList.indexOf(payload.type);
      const {data}  = yield call(queryCount, searchV, type);
      if(data.success) {
        yield put({type: 'setChartData', payload: data});
        yield put({type: 'setCharType', payload: {charType: payload.charType, dataType: type}});
        yield put({type: 'changeVisibleA', payload: {visible: true}});
      } else {
        message.error('暂未查询到相关记录，请稍后再试')
      }
    },
    *searchData({payload}, {call, put, select}) {
      const {searchV} = yield select(_=>_.report);
      payload = Object.assign(payload, searchV);
      const {data}  = yield call(searchData, payload);
      yield put({type: 'tableListChange', payload: data.rows});
    },
  },
  reducers: {
    changeVisibleA (state, {payload}) {
      return {...state, visibleA: payload.visible}
    },
    reset (state, {payload}) {
      return {...state, tableList: payload.tableList, searchV: payload.searchV}
    },
    setSearchV (state, {payload}) {
      return {...state, searchV: payload.searchV}
    },
    setSelectValue (state, {payload}) {
      return {...state, selectData: payload}
    },
    tableListChange (state, {payload}) {
      return {...state, tableList: payload}
    },
    setTempData (state, {payload}) {
      return {...state, temp: payload.data}
    },
    setCharType (state, {payload}) {
      return {...state, charType: payload.charType}
    },
    setChartData (state, {payload}) {
      return {...state, charData: payload}
    },
    setcfData (state, {payload}) {
      return {...state, cfData: payload, visibleB: true}
    },
    closevisibleB (state) {
      return {...state, visibleB: false}
    },
  },
}
