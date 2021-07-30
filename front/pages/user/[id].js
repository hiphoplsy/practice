import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';
import { Card, Avatar } from 'antd';

import AppLayout from '../components/AppLayout';
import PostCard from '../../components/PostCard';
import wrapper from '../store/configureStore';

import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
  }, []);

  useEffect(() => {
    function onScroll() {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePosts && !loadPostsLoading) {
        const lastId = mainPosts[mainPosts.length - 1].id;
      dispatch({
        type: LOAD_POSTS_REQUEST,
        lastId,
      })
      }
    }
  }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [hasMorePosts, loadPostsLoading, mainPosts]);
  return (
    <AppLayout>
      <Head>
        <title>
          {userInfo.nickname}
          의 게시글
        </title>
        <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:image" content="http://nodebird.com/favicon.ico" />
        <meta property="og:url" content={`http://nodebird.com/user/${id}`} />
      </Head>
      {userInfo 
      ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts.length}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings.length}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers.length}
            </div>,
          ]}
        >
          <Card.Meta 
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      )
      : null
      }
      {mainPosts.map((c) => {
        <PostCard key={c.id} post={c} />
      })}
    </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  })
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
  return { props : {} };
});

export default Home;
