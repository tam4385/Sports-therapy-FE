import axios from 'axios';
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
  EXERCISE_UPDATE_REQUEST,
  EXERCISE_UPDATE_SUCCESS,
  EXERCISE_UPDATE_FAIL,
} from '../constants/exerciseConstants';

export const listExercises = (keyword = '') => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = await getState();

    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    dispatch({ type: EXERCISE_LIST_REQUEST });
    const { data } = await axios.get(`/api/exercises?keyword=${keyword}`, config);

    dispatch({
      type: EXERCISE_LIST_SUCCESS,
      payload: data
    });
    
  } catch (error) {
    dispatch({ 
      type: EXERCISE_LIST_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const listExerciseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EXERCISE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/exercises/${id}`);

    dispatch({
      type: EXERCISE_DETAILS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({ 
      type: EXERCISE_DETAILS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

/* DELETE EXERCISE, ADMIN ROUTE */
export const deleteExercise = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXERCISE_DELETE_REQUEST });
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    
    await axios.delete(`/api/exercises/${id}`, config);
    
    dispatch({ type: EXERCISE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ 
      type: EXERCISE_DELETE_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  };
};

/* ADD EXERCISE, ADMIN ROUTE */
export const addExercise = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXERCISE_ADD_REQUEST });
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    
    const { data } = await axios.post(`/api/exercises`, {}, config);

    dispatch({ type: EXERCISE_ADD_SUCCESS, payload: data.addedExercise });
  } catch (error) {
    dispatch({ 
      type: EXERCISE_ADD_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  };
};

/* UPDATE EXERCISE, ADMIN ROUTE */
export const updateExercise = (exercise) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXERCISE_UPDATE_REQUEST });
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    };
    
    const { data } = await axios.put(`/api/exercises/${exercise._id}`, exercise, config);

    dispatch({ type: EXERCISE_UPDATE_SUCCESS, payload: data.updatedExercise });
  } catch (error) {
    dispatch({ 
      type: EXERCISE_UPDATE_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  };
};