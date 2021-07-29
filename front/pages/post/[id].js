import React from 'react';
import { useSelector } from 'react/redux';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';

import { LOAD_POST_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const Post = () => {
  const router = useRouter();
  const { singlePost } = useSelector((state) => state.post);
  const { id } = router.query;

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 게시글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Image[0] ? singlePost.Image[0].src : 'http://nodebird.com/favicon.ico'} />
        <meta property="og:url" content={`http://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(context);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    return axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: singlePost.params.id,
  })
  context.store.dispatch(END);
  await cotext.store.sagaTask.toPromise();
  return { props : {} };
});

export default Post;
