import produce from 'immer';
import shortid from 'shortid';
import faker from 'faker';
import { array } from 'prop-types';

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
    loadPostsLoading: false, // 게시글들 로드 시도중
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading: false, // 게시글 작성 시도중
    addPostDone: false,
    addPostError: null,
    removePostLoading: false, // 게시글 삭제 시도중
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false, // 댓글 작성 시도중
    addCommentDone: false,
    addCommentError: null,
    hasMorePosts: true,
    likePostLoading: false, // 좋아요 시도중
    likePostDone: false,
    likePostError: null,
    unlikePostLoading: false, // 좋아요 취소 시도중
    unlikePostDone: false,
    unlikePostError: null,
};

export const generatedummyPost = (number) => array(number).fill().map(() => ({
  id: shortid.generate(),
  User: {
    id: shortid.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Image: [{
    src: faker.image.image(),
  }],
  Comments: [{
    User: {
      nickname: faker.name.findName(),
    },
    content: faker.lorem.sentence(),
  }],
}));

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type){
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = action.data.concat(draft.mainPosts);
      draft.hasMorePosts = draft.mainPosts.length < 50;
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = false;
      draft.loadPostsError = action.error;
      break;
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
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostsDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS:
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Comments.unshift(action.data);
      break;
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    case LIKE_POST_REQUEST:
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
      break;
    case LIKE_POST_SUCCESS:
      draft.likePostLoading = false;
      draft.likePostDone = true;
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Likers.push({ id: action.data.UserId });
      break;
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false;
      draft.likePostError = action.error;
      break;
    case UNLIKE_POST_REQUEST:
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
      break;
    case UNLIKE_POST_SUCCESS:
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
      break;
    case UNLIKE_POST_FAILURE:
      draft.unlikePostLoading = false;
      draft.unlikePostError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
