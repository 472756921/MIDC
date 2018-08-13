/* global window */
import { query, save, userDel } from '../service/index';
import {message} from 'Antd';

export default {
  namespace: 'user',
  state: {
    visibleA: false,
    tableList: [],
    tempData: '',
  },
  subscriptions: {
    setUp({dispatch, history}) {
      history.listen((location) => {
        if(location.pathname === '/user'){
          dispatch({type: 'getData', payload:{pageSize:30, page: 1}});
        }
      })
    }
  },
  effects: {
    *getData({payload}, {call, put, select}) {
      const {data} = yield call(query, payload);
      yield put({type:'setlist', payload:data.content});
    },
    *save({payload}, {call, put, select}) {
      const {tempData} = yield select(_ => _.user);
      if(tempData.type === 'new') {
        if(tempData.password === '' || tempData.account === '') {
          message.warning('请填写账号密码信息');
          return false;
        }
      }
      const {data} = yield call(save, tempData);
      if(data.status === 200) {
        message.success('修改成功');
        yield put({type:'changeVisibleA', payload: {visible: false}});
        yield put({type:'getData', payload: {pageSize:30, page: 1}});
      } else if(data.status === 401) {
        message.warning('账号密码重复');
      } else {
        message.error('保存失败，请联系管理员处理');
      }
    },
    *del({payload}, {call, put, select}) {
      const {tempData} = yield select(_ => _.user);
      const {data} = yield call(userDel, {id:tempData.tempData});
      if(data.status === 200) {
        message.success('删除成功');
        yield put({type:'getData', payload: {pageSize:30, page: 1}});
      } else {
        message.error('删除失败');
      }
    },
  },
  reducers: {
    setlist (state, {payload}) {
      return {...state, tableList: payload}
    },
    settempData(state, {payload}) {
      return {...state, tempData: payload}
    },
    changeVisibleA (state, {payload}) {
      return {...state, visibleA: payload.visible}
    },
    change (state, {payload}) {
      return {...state, tempData: payload}
    },
  },
}
