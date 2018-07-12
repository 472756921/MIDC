/* global window */

export default {
  namespace: 'knowledge',
  state: {
    visibleA: false,
    visibleB: false,
    visibleC: false,
  },
  subscriptions: {
  },
  effects: {
    *getData({payload}, {call, put, select}) {
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
  },
}
