import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import * as userActions from '../store/actions/userActions';
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import Meta from '../components/Meta';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(userActions.getGoogleUserInfo());
    }
    // eslint-disable-next-line
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userActions.login(email, password));
  };

  const signInWithGoogleHandler = (e) => {
    e.preventDefault();
    window.location.href = `/api/auth/google?redirect=${redirect}`;
  };

  return (
    <>
      <Meta title='ProShop | Login' />
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <LoadingSpinner />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            style={{ marginRight: '5px' }}
          >
            Sign In
          </Button>

          <Button
            type='button'
            variant='danger'
            onClick={signInWithGoogleHandler}
          >
            <i className='fab fa-google left'> Sign In With Google</i>
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
