import pathToRegexp from 'path-to-regexp'
import {query, queryPatient} from "../../services/InformationCollection";

export default {
  namespace: 'Idetail',
  state: {
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
  }
}
