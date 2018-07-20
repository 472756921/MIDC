/* global window */

export default {
  namespace: 'dataMannger',
  state: {
    visible: false,
  },
  subscriptions: {
  },
  effects: {
    *getData({payload}, {call, put, select}) {
    },
    *del({payload}, {call, put, select}) {
    },
  },
  reducers: {
    visible(state, {payload}) {
      return {...state, visible: payload.visible}
    },
  },
}
