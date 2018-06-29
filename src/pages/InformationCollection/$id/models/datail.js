import pathToRegexp from 'path-to-regexp'
import {message} from 'antd'
import {queryPatient, addRec} from "../../services/InformationCollection";
import { routerRedux } from 'dva/router'

export default {
  namespace: 'Idetail',
  state: {
    visible: false,
    addModel: false,
    pid: '',
    imgSrc: '',
    index: 0,
    patient: {
      info: {},
      historyData:[
        {
          date: '',
          visitTimes: '',
          diagnosisOfZh: {},
          diagnosisOfWe: {},
          diagnosisAndtreatment: {},
          ohter: {},
        }
      ]
    }
  },
  subscriptions: {
    setUp({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname.indexOf('/informationCollection/') !== -1) {
          const id = pathToRegexp('/informationCollection/:id').exec(pathname)[1];
          dispatch({type: 'query', payload:{pid: id}});
        }
      })
    }
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const {data} = yield call(queryPatient, payload);
      data.pid = payload.pid;
      yield put({type: 'querySuccess', payload:data});
    },
    * addRec ({ postData }, { call, put, select }) {
      console.log(postData);
      const {pid} = yield select(_=>_.Idetail);
      postData.id = pid;
      const {data} = yield call(addRec, postData);
      if(data.success) {
        message.success('添加成功');
        yield put(routerRedux.push({
          pathname: '/informationCollection/' + pid,
        }))
        yield put({type: 'addModelOp', payload:{f: false}});
      } else {
        message.success(data.error);
      }
    },
  },
  reducers: {
    querySuccess(state, {payload}) {
      return {...state, patient: payload, pid: payload.pid}
    },
    addModelOp(state, {payload}) {
      return {...state, addModel: payload.f}
    },
    showImg(state, {payload}) {
      return {...state, visible: payload.visible, imgSrc: payload.imgSrc}
    },
    changIndex(state, {payload}) {
      return {...state, index: payload.index}
    },
  }
}
