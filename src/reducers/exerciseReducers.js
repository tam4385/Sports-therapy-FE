import { 
  EXERCISE_LIST_REQUEST,
  EXERCISE_LIST_SUCCESS,
  EXERCISE_LIST_FAIL,
  EXERCISE_DETAILS_REQUEST,
  EXERCISE_DETAILS_SUCCESS,
  EXERCISE_DETAILS_FAIL,
  EXERCISE_DELETE_REQUEST,
  EXERCISE_DELETE_SUCCESS,
  EXERCISE_DELETE_FAIL,
  EXERCISE_ADD_REQUEST,
  EXERCISE_ADD_SUCCESS,
  EXERCISE_ADD_FAIL,
  EXERCISE_ADD_RESET,
  EXERCISE_UPDATE_REQUEST,
  EXERCISE_UPDATE_SUCCESS,
  EXERCISE_UPDATE_FAIL,
  EXERCISE_UPDATE_RESET
 } from '../constants/exerciseConstants';

export const exerciseListReducer = (state = { exercises: [] }, action) => {
  switch(action.type) {
    case EXERCISE_LIST_REQUEST:
      return { loading: true, exercises: [] }
    case EXERCISE_LIST_SUCCESS:
      return { loading: false, exercises: action.payload.data }
    case EXERCISE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
};

export const exerciseDetailsReducer = (state = { exercise: {} }, action) => {
  switch(action.type) {
    case EXERCISE_DETAILS_REQUEST:
      return { loading: true, ...state }
    case EXERCISE_DETAILS_SUCCESS:
      return { loading: false, exercise: action.payload.data }
    case EXERCISE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
};


export const exerciseDeleteReducer = (state = {}, action) => {
  switch(action.type) {
    case EXERCISE_DELETE_REQUEST:
      return { loading: true }
    case EXERCISE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case EXERCISE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
};

export const exerciseAddReducer = (state = {}, action) => {
  switch(action.type) {
    case EXERCISE_ADD_REQUEST:
      return { loading: true }
    case EXERCISE_ADD_SUCCESS:
      return { loading: false, success: true, exercise: action.payload }
    case EXERCISE_ADD_FAIL:
      return { loading: false, error: action.payload }
    case EXERCISE_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const exerciseUpdateReducer = (state = { exercise: {} }, action) => {
  switch(action.type) {
    case EXERCISE_UPDATE_REQUEST:
      return { loading: true }
    case EXERCISE_UPDATE_SUCCESS:
      return { loading: false, success: true, exercise: action.payload }
    case EXERCISE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case EXERCISE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};