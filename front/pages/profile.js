import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useSWR from 'swr';
import Router from 'next/router';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { getServerSideProps } from './user/[id]';

const profile = () => {
  const { me } = useSelector((state) => state.user);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);
  
  const { data: followingsData, error: followingsError } = useSWR(`http://localhost:3065/follower?limit=${followingsData}`, fetcher);
  const { data: followersData, error: followersError } = useSWR(`http://localhost:3065/follower?limit=${followersData}`, fetcher);

  const fetcher = (url) => axios.get(url, { withCredentials: true }.then((result) => result.data));

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_FOLLOWERS_REQUEST,
  //   })
  //   dispatch({
  //     type: LOAD_FOLLOWINGS_REQUEST,
  //   })
  // }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      return Router.push('/');
    } 
  }, [me && me.id]);
  

  if (followingsError || followersError) {
    console.error(followingsError || followersError);
    return '팔로잉/팔로워 로드 중 에러가 발생하였습니다.';
  }
  if (!me) {
    return '로그인이 필요합니다.';
  }

  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList 
        header="팔로워목록"
        data={followersData}
        loading={!followersData && !followersError}
        onClickMore={loadMoreFollowers}
      />
      <FollowList
        header="팔로잉목록"
        data={followingsData}
        loading={!followingsData && !followingsError}
        onClickMore={loadMoreFollowings}
      />
    </AppLayout>
  )
};

export const getServerSideProps = getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    return axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default profile;
