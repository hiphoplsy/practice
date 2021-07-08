import { all, fork, call, takeLatest, delay, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
} from '../reducers/post'

function addPostAPI(data) {
  axios.post('/api/post', data)
}

function* addPost(action) {
  yield delay(2000);
  try {
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS, 
      data: action.data,
  });
  } catch(err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
  ]);
}