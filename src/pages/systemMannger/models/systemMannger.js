/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */
import { routerRedux } from 'dva/router'
import {getSLData} from "../service/systemMannger";

export default {
  namespace: 'systemMannger',
  state: {
    lsitData: [],
    nowType: 'cdm',
    itemData: '123',
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
      yield put({type: 'setData', data})
    }
  },
  reducers: {
    setData (state, {data}) {
      return {...state, lsitData: data }
    },
    changeItemData (state, {itemData}) {
      return {...state, itemData: itemData }
    },
  },
}
