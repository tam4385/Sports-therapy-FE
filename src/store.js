import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
  userDetailsReducer, 
  userLoginReducer, 
  userRegisterReducer, 
  userUpdateProfileReducer, 
  userListReducer ,
  userDeleteReducer,
  userUpdateReducer,
  userAddExerciseReducer,
  userListExercisesReducer,
  userDeleteExerciseReducer
} from './reducers/userReducers';
import { 
  exerciseListReducer, 
  exerciseDetailsReducer, 
  exerciseDeleteReducer, 
  exerciseAddReducer, 
  exerciseUpdateReducer,
} from './reducers/exerciseReducers';
import { userGraphDataReducer } from './reducers/dataReducers';

const reducer = combineReducers({
  exerciseList: exerciseListReducer,
  exerciseDetails: exerciseDetailsReducer,
  exerciseDelete: exerciseDeleteReducer,
  exerciseAdd: exerciseAddReducer,
  exerciseUpdate: exerciseUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userAddExercise: userAddExerciseReducer,
  userListExercises: userListExercisesReducer,
  userDeleteExercise: userDeleteExerciseReducer,
  userGraphData: userGraphDataReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;