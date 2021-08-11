import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL,
  GET_USER_DATA_RESET
} from '../constants/dataContants';

export const userGraphDataReducer = (state = { userGraphData: [] }, action) => {
  switch(action.type) {
    case GET_USER_DATA_REQUEST:
      return { loading: true, userDataGraph: [] }
    case GET_USER_DATA_SUCCESS:
      return { loading: false, userGraphData: action.payload.data }
    case GET_USER_DATA_FAIL:
      return { loading: false, error: action.payload }
    case GET_USER_DATA_RESET:
      return { userGraphData: [] };
    default:
      return state;
  }
};