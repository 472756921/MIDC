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
      const d = getList();
      let {tempData} = yield select(_=>_.dataMannger);
      let isl = '';
      if(d.length === 0) {
        isl = tempData.attach.map((it, i) => {
          return {
            id: it.uid
          }
        })
      } else {
        isl = d.map((it, i) => {
          if(it.response){
            return {
              id: it.response.uid
            }
          } else {
            return {
              id: it.uid
            }
          }
        })
      }
      tempData.attachments = isl;
      const {data} = yield call(add, tempData);
    },
    *del({payload}, {call, put, select}) {
    },
    *changeTemp({payload}, {call, put, select}) {
      let {tempData} = yield select(_=>_.dataMannger);
      tempData[payload.type] = payload.data;
      yield put({type: 'settempData', payload: tempData});
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
