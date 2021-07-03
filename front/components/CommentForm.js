import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useState('');

  const onSubmitComment = useCallback(() => {
    console.log(commentText);
  }, [commentText]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
    setCommentText('');
  }, []);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea row={4} maxLength={300} value={commentText} onChange={onChangeCommentText} />
        <Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit">댓글삐약</Button>
      </Form.Item>
    </Form>
  )
};

CommentForm.propTypes = {
  post: PropTypes.array.isRequired,
}

export default CommentForm;
