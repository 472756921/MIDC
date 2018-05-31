/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */
import { routerRedux } from 'dva/router'
import { message } from 'antd';
import { query } from '../services/InformationCollection';

export default {
  namespace: 'informationCollection',
  state: {
    listData: {},
  },
  subscriptions: {
    setUp({dispatch, history}) {
      history.listen((location) => {
        if(location.pathname === '/InformationCollection'){
          dispatch({type: 'query',});
        }
      })
    }
  },
  effects: {
    * query ({ payload = { page: 1, pageSize: 30 } }, { call, put }) {
      const {data} = yield call(query, payload)
      if (data) {
        yield put({type: 'querySuccess', payload: data});
      }
    },
  },
  reducers: {
    querySuccess(state, {payload}) {
      return {...state, listData: payload}
    },
  },
}
