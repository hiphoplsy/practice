import { all, fork, call, takeLatest, delay, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, 
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, 
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsAPI(data) {
  axios.get('/api/posts', data);
}

function* loadPosts(action) {
  try {
    // const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: action.data,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    })
  }
}

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
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    })
  }
}

function removePostAPI(data) {
  axios.delete(`/api/post/${data}`, data)
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      err: err.response.data,
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchLoadPosts),
  ]);
}