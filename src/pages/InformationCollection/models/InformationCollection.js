/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */
import { query, addPatient } from '../services/InformationCollection';
import { routerRedux } from 'dva/router'

export default {
  namespace: 'informationCollection',
  state: {
    listData: {}, //显示数据
    searchV: '',
    visible: false,
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
    * query ({ payload = { page: 1, pageSize: 30, searchV: '' } }, { call, put, select }) {
      if(payload.searchV === 'getState') {
        payload.searchV = yield select(_=>_.informationCollection.searchV);
      }
      const {data} = yield call(query, payload)
      if (data) {
        yield put({type: 'querySuccess', payload: {data:data , searchV: payload.searchV}});
      }
    },
    * showModal({payload}, { call, put }) {
      yield put({ type: 'modalVisible',payload });
    },
    * addPatient({payload}, { call, put }) {
      const {data} = yield call(addPatient, payload)
      yield put({ type: 'modalVisible',payload:{visible:false} });
      yield put(routerRedux.push({
        pathname: '/informationCollection/' + data.data,
      }))
    }
  },
  reducers: {
    querySuccess(state, {payload}) {
      return {...state, listData: payload.data, searchV: payload.searchV}
    },
    modalVisible(state, {payload}) {
      return {...state, visible: payload.visible }
    },
  },
}
