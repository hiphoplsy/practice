import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';

const Nodebird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  )
}

Nodebird.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(Nodebird);
