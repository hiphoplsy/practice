import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ post }) => {
  return (
    <div>CommentForm</div>
  )
};

CommentForm.propTypes = {
  post: PropTypes.array.isRequired,
}

export default CommentForm;
