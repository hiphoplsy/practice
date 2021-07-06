import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import useInput from '../hooks/useInput';

import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    console.log({
      email, password
    });
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    })
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input 
          name="user-email"
          placeholder="이메일을 입력해주세요"
          value={email} 
          bordered 
          required 
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input 
          name="user-password" 
          placeholder="비밀번호를 입력해주세요"
          value={password} 
          type="password" 
          bordered 
          required 
          onChange={onChangePassword}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" htmlType="submit">로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </div>
    </Form>
  )
};

export default LoginForm;
