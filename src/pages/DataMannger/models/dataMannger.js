/* global window */
import {query, add} from '../service';
import {getList} from '../../../components/FileUpload/index';

export default {
  namespace: 'dataMannger',
  state: {
    visible: false,
    visibleDown: false,
    tempData: '',
    listData: '',
  },
  subscriptions: {
    setUp({dispatch, history}) {
      history.listen((location) => {
        if(location.pathname === '/dataMannger'){
          dispatch({type: 'getData', payload:{pageSize:30, page: 1, title: '', key: ''}});
        }
      })
    }
  },
  effects: {
    *getData({payload}, {call, put, select}) {
      const {data} = yield call(query, payload);
      yield put({type:'setlist', payload:data.data});
    },
    *save({payload}, {call, put, select}) {
      let d = getList();
      console.log(d);
      const {data} = yield call(add, payload)
    },
    *del({payload}, {call, put, select}) {
    },
  },
  reducers: {
    visible(state, {payload}) {
      return {...state, visible: payload.visible}
    },
    visibleDown(state, {payload}) {
      return {...state, visibleDown: payload.visibleDown}
    },
    setlist(state, {payload}) {
      return {...state, listData: payload}
    },
    settempData(state, {payload}) {
      return {...state, tempData: payload}
    }
  },
}
