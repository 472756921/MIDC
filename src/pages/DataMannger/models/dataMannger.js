/* global window */
import {query, add, delData, search} from '../service';
import { message } from 'antd';
import {getList} from '../../../components/FileUpload/index';
const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

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
      const {imgList, change} = getList();
      let {tempData} = yield select(_=>_.dataMannger);
      let isl = '';
      if(imgList.length === 0 && change) {
        return []
      } else if (imgList.length === 0 && !change) {
        isl = tempData.attach.map((it, i) => {
          return {
            id: it.uid
          }
        })
      } else {
        isl = imgList.map((it, i) => {
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
      if(tempData.name === '' || tempData.keyName === '') {
        message.warning('请填写名称和关键字');
        return false;
      }
      const {data} = yield call(add, tempData);
      if(data.status === 200) {
        yield put({type:'dataMannger/visible', payload:{visible: false}});
        yield put({type:'getData', payload:{pageSize:30, page: 1, title: '', key: ''}});
      }
    },
    *del({payload}, {call, put, select}) {
      const {data} = yield call(delData, payload);
      yield put({type:'getData', payload:{pageSize:30, page: 1, title: '', key: ''}});
    },
    *changeTemp({payload}, {call, put, select}) {
      let {tempData} = yield select(_=>_.dataMannger);
      tempData[payload.type] = payload.data;
    },
    *search({payload}, {call, put}) {
      const {data} = yield call(query, payload);
      yield put({type:'setlist', payload:data.data});
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
