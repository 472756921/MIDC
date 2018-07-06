/* global window */
import {getSLData, saveData, del, search} from "../service/systemMannger";
import { message } from 'antd';

export default {
  namespace: 'systemMannger_cd',
  state: {
    tableItem: [],
    nowType: 'cd',
    itemData: '',
    modelShow: false,
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
    changeDate(state, {payload}) {
      return {...state, date: payload.date}
    }
  },
}
