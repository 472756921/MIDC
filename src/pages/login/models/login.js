/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */
import { routerRedux } from 'dva/router'
import { login } from '../service/login'
import { message } from 'antd';

export default {
  namespace: 'login',
  state: {
    user: '',
  },
  subscriptions: {
  },
  effects: {
    * login ({payload}, { put, call, select }) {
      const {data} = yield call(login, payload)
      if(data.status === 400) {
        message.error('账号密码错误');
      } else if (data.status === 200){
        yield put({type: 'loginScuess', payload: data.user});
        yield put(routerRedux.push({
          pathname: '/InformationCollection',
        }))
      } else {
        message.error(data.error);
      }
    },
  },
  reducers: {
    loginScuess (state, {payload} ) {
      return {
        ...state,
        user: payload.data,
      }
    }
  },
}
