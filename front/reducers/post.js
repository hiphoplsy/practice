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

const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default reducer;
