import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Row, Col } from 'antd';

import LoginForm from './loginForm';
import UserProfile from './UserProflie';

const AppLayout = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.SubMenu key="sub1" title="메뉴">
          <Menu.Item key="1">
            <Link href='/'><a>홈</a></Link>
          </Menu.Item>
          <Menu.Item key="2">
          <Link href='/profile'><a>프로필</a></Link>
          </Menu.Item>
          <Menu.Item key="3">
          <Link href='/signup'><a>회원가입</a></Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>

        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
         <a href="https://hiphoplsy.tistory.com" target="_blank" rel="noreferrer noopener">제작자블로그</a>
          {isLoggedIn 
            ? <UserProfile /> 
            : <LoginForm setLoggedIn={setIsLoggedIn} />}
        </Col>
      </Row>
    </div>
  )
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
