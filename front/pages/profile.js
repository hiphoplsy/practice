import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';

const profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    })
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    })
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      return Router.push('/');
    } 
  }, [me && me.id]);
  
  if (!me) {
    return null;
  }

  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList 
        header="팔로워목록"
        data={me.Followers}
      />
      <FollowList
        header="팔로잉목록"
        data={me.followings}
      />
    </AppLayout>
  )
};

export default profile;
