import { routerRedux } from 'dva/router'
import { getUser, loginOut } from '../services/app';
import { meuns } from '../utils/menu';

export default {
  namespace: 'app',
  state: {
    user: '',
    menu: [],
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        if(location.pathname!=='/login' && location.pathname!=='/404'){
          dispatch({ type: 'query' });
        }
      })
    },
  },
  effects: {
    * query( {payload}, {call, put} ) {
      const {data}  = yield call(getUser);
      if(data.status === 403) {
        yield put(routerRedux.push({
          pathname: '/login',
        }))
      } else {
        let utype = data.roleId===0?3:data.roleId===2?2:1;
        const m = meuns.filter((it) => {if(utype>=it.type){return it}else {return false}});
        yield put({type: 'userInfo', payload: {data, m}});
      }
    },
    *loginOut({payload}, {call, put}) {
      const {data}  = yield call(loginOut);
      if(data.status === 200) {
        yield put(routerRedux.push({
          pathname: '/login',
        }))
      }
    }
  },
  reducers: {
    userInfo(state, {payload}) {
      return {
        ...state,
        user: payload.data,
        menu: payload.m,
      }
    }
  },
}
