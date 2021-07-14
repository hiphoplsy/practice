import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { 
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE
} from '../reducers/user';

function signUpAPI(data) {
  axios.post('/user/signup', data);
}

function* signUp(action) {
  try {
    yield delay(2000);
    // const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      data: err.response.data,
    })
  }
}

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

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp)
  ])
}