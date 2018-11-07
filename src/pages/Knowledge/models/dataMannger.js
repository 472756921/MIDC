/* global window */
import {getSLData, cdList, getCF} from "../../systemMannger/service/systemMannger";
import {searchData, searchData2, searchData3} from '../service/index';
export default {
  namespace: 'knowledge',
  state: {
    visibleA: false,
    visibleB: false,
    visibleC: false,
    cfData: [],
    tableList: [],
    searchV: { glzz: "", jy: "", name: "", type: "", xwgj: "", xz: "", lyya: "" },
    searchV2: {doctor: "", name: "", xyjb: "", zfm: "", zhenzhuang: "", zyjb: "", zyzh: ""},
    searchV3: {
      cfly: "",
      cfys: "",
      fjgx: "",
      fjzz: "",
      gytj: "",
      name: "",
      lyya: "",
      xjyb: "",
      zyzh: "",
      zyzz: "",
      zzxyjb: "",
      zzzyjb: ""
    },
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
    *getCF({payload}, {call, put, select}) {
      const {data}  = yield call(getCF, payload);
      yield put({type: 'SetcfData', payload: data});
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
      } else if(payload.type === 'fj'){
        url = searchData3;
        let t = yield select(_=>_.knowledge);
        searchV = t.searchV3
      }
      const {data}  = yield call(url, searchV);
      yield put({type: 'tableListChange', payload: data.rows});
    },
  },
  reducers: {
    SetcfData (state, {payload}) {
      return {...state, cfData: payload}
    },
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
      return {...state, visibleC: payload.visible, yaShowData: payload.data}
    },
    reset (state, {payload}) {
      return {...state, ...payload}
    },
    setSearchV (state, {payload}) {
      console.log(payload);
      return {...state, ...payload}
    },
    setSelectValue (state, {payload}) {
      return {...state, selectData: payload}
    },
    tableListChange (state, {payload}) {
      return {...state, tableList: payload}
    },
    tableListClear (state, {payload}) {
      return {...state, tableList: [], visibleA:false, visibleB:false, visibleC:false}
    },
    setTempData (state, {payload}) {
      return {...state, temp: payload.data}
    },

  },
}
