import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { 
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE
} from '../reducers/user';

function logInAPI(data){
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    yield delay(2000);
    // const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      err: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.delete('user/logout')
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      err: err.response.data,
    })
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
  ])
}