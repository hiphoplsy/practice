import produce from 'immer';

export const initialState = {
    mainPosts: [{
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '첫번째 게시글 #해시태그 #익스프레스',
      Images: [{
        src: 'https://pixabay.com/images/id-3024154/',
      }, {
        src: 'https://pixabay.com/images/id-488714/',
      }, {
        src: 'https://pixabay.com/images/id-1284253/',
      }]
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와아아아',
    }, {
      User: {
        nickname: 'zero',
      },
      content: 'Wow~2',
    }],
    imagePaths: [],
    postAdded: false,
    addPostLoading: false, // 게시글 작성 시도중
    addPostDone: false,
    addPostError: null,
};

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '제로',
  },
  Image: [],
  Comments: [],
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type){
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(dummyPost(action.data));
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostDone = false;
      draft.addPostError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
