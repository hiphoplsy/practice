import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { LOG_OUT_REQUEST } from '../reducers/user';

const dummy = {
  nickname: '제로초',
  Posts: [],
  Followings: [],
  Followers: [],
  isLoggedIn: false,
}

const UserPropfile = () => {
  const { me, logOutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
  }, []);

  return (
    <Card 
      actions={[
        <div key="twit">짹짹<br />{me.Posts.length}</div>,
        <div key="followings">팔로잉<br />{me.Followings.length}</div>,
        <div key="followers">팔로워<br />{me.Followers.length}</div>,
      ]}
    >      
    <Card.Meta
      avatar={<Avatar>{me.nickname[0]}</Avatar>}
      title={me.nickname}
    />
    <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
    </Card>
  )
};

export default UserPropfile;