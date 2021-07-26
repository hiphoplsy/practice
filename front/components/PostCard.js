import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { Link } from 'next/link';

import { RetweetOutlined , HeartTwoTone, HeartOutlined, MessageOutlined } from '@ant-design/icons';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { removeLoading } = useSelector((state) => state.post);

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    })
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    })
  }, [id]);

  const onToggleCommentForm = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    })
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    })
  }, [id]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[<RetweetOutlined onClick={onRetweet} />,
          liked
          ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike} />
          : <HeartOutlined key="heart" onClick={onLike} />,
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
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={<FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet 
        ? (
          <Card>
            <Card.Meta 
              avatar={<Avatar>{post.Retweet.nickname[0]}</Avatar>}
              title={post.Retweet.User.nickname[0]}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        )
        : (
          <>
            <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname[0]}
            description={<PostCardContent postData={post.content} />}
            />
          </>
        )
        }
      </Card>
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
  </div>
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
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }),
};

export default PostCard;
