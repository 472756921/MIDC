import pathToRegexp from 'path-to-regexp'
import {queryPatient} from "../../services/InformationCollection";

export default {
  namespace: 'Idetail',
  state: {
    visible: false,
    addModel: false,
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
      yield put({type: 'querySuccess', payload:data});
    },
  },
  reducers: {
    querySuccess(state, {payload}) {
      return {...state, patient: payload}
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
