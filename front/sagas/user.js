import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { 
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
  CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
} from '../reducers/user';

function signUpAPI(data) {
  return axios.post('/user/signup', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
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
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      err: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.delete('/user/logout')
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
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

function followAPI(data) {
  return axios.post(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      data: err.response.data,
    })
  }
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/unfollow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      data: err.response.data,
    })
  }
}

function loadUserAPI(data) {
  return axios.get('/user', data)
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      data: err.response.data,
    })
  }
}

function changeNicknameAPI(data){
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      data: err.response.data,
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

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchChangeNickname(){
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadUser),
    fork(watchChangeNickname),
  ])
}