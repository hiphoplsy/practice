import React from 'react';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const profile = () => {
  const followerList = [{nicknnme:'김하트'}, {nicknnme:'김하트2'} , {nicknnme:'김하트3'}];
  const followingList = [{nicknnme:'제로트'}, {nicknnme:'제로트2'} , {nicknnme:'제로트3'}];

  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList 
        header="팔로워목록"
        data={followerList}
      />
      <FollowList
        header="팔로잉목록"
        data={followingList}
      />
    </AppLayout>
  )
};

export default profile;
