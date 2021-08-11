import axios from 'axios';

import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL
} from '../constants/dataContants';

export const getUserGraphData = () => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = await getState();

    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    dispatch({ type: GET_USER_DATA_REQUEST });
    const { data } = await axios.get(`/api/data/users`, config);

    dispatch({
      type: GET_USER_DATA_SUCCESS,
      payload: data
    });
    
  } catch (error) {
    dispatch({ 
      type: GET_USER_DATA_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};