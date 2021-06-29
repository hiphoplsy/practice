import React from 'react';
import PropTypes from 'prop-types';

const PostImages = ({ images }) => {
  return (
    <div>PostImages</div>
  )
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;
