import { handleActions } from 'redux-actions'

export default handleActions({
  'Loading show': (state) => {
    return {
      ...state,
      loading: true,
      ajaxCount: state.ajaxCount + 1
    }
  },
  'Loading hidden': (state) => {
    return {
      ...state,
      loading: false,
      ajaxCount: state.ajaxCount - 1
    }
  },
  'weakNet show': (state) => {
    return {
      ...state,
      weakNets: true
    }
  }
}, {
  loading: false,
  weakNets: false,
  ajaxCount: 0
})
