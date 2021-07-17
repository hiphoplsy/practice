import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { Link } from 'next/link';

import { RetweetOutlined , HeartTwoTone, HeartOutlined, MessageOutlined } from '@ant-design/icons';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import { REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const CardWrapper = styled.div`
  margin-bottom: 20px
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { removeLoading } = useSelector((state) => state.post);

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleCommentForm = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    })
  }, []);

  return (
    <CardWrapper>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[<RetweetOutlined />,
          liked
          ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
          : <HeartOutlined key="heart" onClick={onToggleLike} />,
          <MessageOutlined key="message" onClick={onToggleCommentForm} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {id && post.User.id === id
                  ? (<>
                      <Button>수정</Button>
                      <Button type="danger" loading={removeLoading} onClick={onRemovePost}>삭제</Button>
                    </>)
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={<FollowButton post={post} />}
      >
      <Card.Meta
        avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
        title={post.User.nickname[0]}
        description={<PostCardContent postData={post.content} />}
      />
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
            <List
              header={`${post.Comments.length} 개의 댓글`}
              itemLayout="horizontal"
              dataSource={post.Comments}
              renderItem={(item) => (
                <li>
                  <Comment
                    avatar={<Link href={{ pathname: '/user', query: {id: item.User.id} }} as={`/user/${item.User.id}`}>
                      <a><Avatar>{post.Comments.nickname[0]}</Avatar></a>
                    </Link>}
                    author={post.Comments.nickname}
                    content={post.Comments.content}
                  />
                </li>
              )}
            />
        </>
      )}
      </Card>
  </CardWrapper>
  )
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    UserId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
