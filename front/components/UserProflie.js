import React from 'react';
import { Card, Avatar, Button } from 'antd';

const dummy = {
  nickname: '제로초',
  Posts: [],
  Followings: [],
  Followers: [],
  isLoggedIn: false,
}

const UserPropfile = () => {

  return (
    <Card 
      actions={[
        <div key="twit">짹짹<br />{dummy.Posts.length}</div>,
        <div key="followings">팔로잉<br />{dummy.Followings.length}</div>,
        <div key="followers">팔로워<br />{dummy.Followers.length}</div>,
      ]}
    >      
    <Card.Meta
      avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
      title={dummy.nickname}
    />
    <Button>로그아웃</Button>
    </Card>
  )
};

export default UserPropfile;