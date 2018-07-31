/* global window */
import {getSLData, cdList} from "../../systemMannger/service/systemMannger";
import {searchData} from '../service/index';
export default {
  namespace: 'knowledge',
  state: {
    visibleA: false,
    visibleB: false,
    visibleC: false,
    tableList: [],
    searchV: {},
    temp: {},
    selectData: [],
  },
  subscriptions: {
  },
  effects: {
    *selectData({payload}, {call, put, select}) {
      const {data}  = yield call(getSLData, payload);
      yield put({type: 'setSelectValue', payload: data});
    },
    *selectDataByCd({payload}, {call, put, select}) {
      const {data}  = yield call(cdList, payload);
      yield put({type: 'setSelectValue', payload: data});
    },
    *searchData({payload}, {call, put, select}) {
      const {searchV} = yield select(_=>_.knowledge);
      payload = Object.assign(payload, searchV);
      const {data}  = yield call(searchData, payload);
      yield put({type: 'tableListChange', payload: data});
    },
  },
  reducers: {
    changeVisibleA (state, {payload}) {
      return {...state, visibleA: payload.visible}
    },
    changeVisibleB (state, {payload}) {
      return {...state, visibleB: payload.visible}
    },
    changeVisibleC (state, {payload}) {
      return {...state, visibleC: payload.visible}
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

  },
}
