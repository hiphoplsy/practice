import produce from 'immer';

const dummyUser = {
  id: 1, 
  nickname: '제로초',
  Posts: [],
  Followings: [],
  Followers: [],
}

export const initialState = {
    isLoggedIn: false,
    me: null,
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    followLoading: false, // 팔로우 시도중
    followDone: false,
    followError: null,
    unfollowLoading: false, // 언팔로우 시도중
    unfollowDone: false,
    unfollowError: null,
    loadUserLoading: false, // 유저정보 불러오기 시도중
    loadUserDone: false,
    loadUserError: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_REQUEST';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_REQUEST';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_REQUEST';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type){
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpDone = false;
      draft.signUpError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpDone = false;
      draft.signUpError = action.error;
      break;
    case LOAD_USER_REQUEST:
      draft.loadUserLoading = true;
      draft.loadUserDone = false;
      draft.loadUserError = null;
      break;
    case LOAD_USER_SUCCESS:
      draft.loadUserLoading = false;
      draft.loadUserDone = true;
      draft.me = action.data;
      break;
    case LOAD_USER_FAILURE:
      draft.loadUserLoading = false;
      draft.loadUserDone = false;
      draft.loadUserError = action.error;
      break;
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInDone = false;
      draft.logInError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.loginDone = true;
      draft.me = dummyUser(action.data);
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInDone = false;
      draft.logInError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutDone = false;
      draft.logOutError = action.error;
      break;
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followDone = false;
      draft.followError = null;
      break;
    case FOLLOW_SUCCESS:
      draft.followLoading = false;
      draft.followDonee = true;
      draft.me.Followings.push({ id : action.data });
      break;
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.unfollowLoading = true;
      draft.unfollowDone = false;
      draft.unfollowError = null;
      break;
    case UNFOLLOW_SUCCESS:
      draft.unfollowLoading = false;
      draft.unfollowDonee = true;
      draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
      break;
    case UNFOLLOW_FAILURE:
      draft.unfollowLoading = false;
      draft.unfollowError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.nickname = action.data.nickname;
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts.filter((v) => v.id !== action.data);
      break;
    default:
      break;
  }
});

export default reducer;
