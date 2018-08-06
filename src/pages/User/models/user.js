/* global window */
import {searchData} from '../service/index';
export default {
  namespace: 'user',
  state: {
    visibleA: false,
    tableList: [{id: 12, name: 'xx', qx: 1, createdDate: '2012-12-12'}],
    tempData: '',
  },
  subscriptions: {
  },
  effects: {
    *selectData({payload}, {call, put, select}) {
    },
    *resetUsers({payload}, {call, put, select}) {
    },
    *del({payload}, {call, put, select}) {
    },
  },
  reducers: {
    changeVisibleA (state, {payload}) {
      return {...state, visibleA: payload.visible}
    },
    settempData (state, {payload}) {
      return {...state, tempData: payload.tempData}
    },
    setCharType (state, {payload}) {
      return {...state, charType: payload.charType}
    },
  },
}
