import pathToRegexp from 'path-to-regexp'
import {message} from 'antd'
import {queryPatient, addRec, saveYan} from "../../services/InformationCollection";
import { routerRedux } from 'dva/router'

export default {
  namespace: 'Idetail',
  state: {
    temp: '',
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
    * saveYan ({ payload }, { call, put, select }) {
      const {temp} = yield select(_=>_.Idetail);
      const {data} = yield call(saveYan, {id: temp});
      if(data.status === 200) {
        message.success('已成功保存为医案');
      } else {
        message.error('添加失败，请稍后再试');
      }
    },
    * addRec ({ postData }, { call, put, select }) {
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
    setTempData(state, {payload}) {
      return {...state, temp: payload.temp}
    },
  }
}
