/* global window */
// import { routerRedux } from 'dva/router'
import {getSLData} from "../service/systemMannger";

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
  },
  reducers: {
    setData (state,{payload}) {
      return {...state, lsitData: payload.data, nowType: payload.type }
    },
    changeItemData (state, payload) {
      return {...state, itemData: payload.itemData, cltype: payload.cltype }
    },
  },
}
