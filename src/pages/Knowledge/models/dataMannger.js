/* global window */
import {getSLData, cdList} from "../../systemMannger/service/systemMannger";
import {searchData, searchData2} from '../service/index';
export default {
  namespace: 'knowledge',
  state: {
    visibleA: false,
    visibleB: false,
    visibleC: false,
    tableList: [],
    searchV: {
      glzz: "",
      jy: "",
      name: "",
      type: "",
      xwgj: "",
      xz: ""
    },
    searchV2: {doctor: "", name: "", xyjb: "", zfm: "", zhenzhuang: "", zyjb: "", zyzh: ""},
    temp: {},
    selectData: [],
    yaShowData: '',
  },
  subscriptions: {
  },
  effects: {
    *selectData({payload}, {call, put, select}) {
      const {data}  = yield call(getSLData, payload);
      yield put({type: 'setSelectValue', payload: data});
    },
    *selectDataByCd({payload}, {call, put, select}) {
      const {data}  = yield call(cdList, payload);
      yield put({type: 'setSelectValue', payload: data});
    },
    *searchData({payload}, {call, put, select}) {
      let searchV = '';
      let url = searchData;
      if(payload.type === 'zy'){
        url = searchData;
        let t = yield select(_=>_.knowledge);
        searchV = t.searchV;
      } else if(payload.type === 'ya'){
        url = searchData2;
        let t = yield select(_=>_.knowledge);
        searchV = t.searchV2
      }
      const {data}  = yield call(url, searchV);
      yield put({type: 'tableListChange', payload: data.rows});
    },
  },
  reducers: {
    changeVisibleA (state, {payload}) {
      return {...state, visibleA: payload.visible}
    },
    changeVisibleB (state, {payload}) {
      return {...state, visibleB: payload.visible}
    },
    changeVisibleC (state, {payload}) {
      return {...state, visibleC: payload.visible}
    },
    showYa (state, {payload}) {
      console.log(payload.data);
      return {...state, visibleC: payload.visible, yaShowData: payload.data}
    },
    reset (state, {payload}) {
      return {...state, tableList: payload.tableList, searchV: payload.searchV}
    },
    setSearchV (state, {payload}) {
      return {...state, searchV: payload.searchV}
    },
    setSelectValue (state, {payload}) {
      return {...state, selectData: payload}
    },
    tableListChange (state, {payload}) {
      return {...state, tableList: payload}
    },
    tableListClear (state, {payload}) {
      return {...state, tableList: []}
    },
    setTempData (state, {payload}) {
      return {...state, temp: payload.data}
    },

  },
}
