import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Product from '../components/Product';
import * as productActions from '../store/actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.listProducts());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Message variant='danger' children={error} />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
