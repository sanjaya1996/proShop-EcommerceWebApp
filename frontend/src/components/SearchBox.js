import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        placeholder='Search Products...'
        onChange={(e) => setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit'>Search</Button>
    </Form>
  );
};

export default SearchBox;
