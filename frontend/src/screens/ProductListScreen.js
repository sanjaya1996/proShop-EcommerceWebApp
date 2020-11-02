import React, { useEffect } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

import * as productActions from '../store/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../store/constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const pageNumber = match.params.pageNumber;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(productActions.listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const createProductHandler = () => {
    dispatch(productActions.createProduct());
  };

  const deleteProductHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(productActions.deleteProduct(id));
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading || loadingDelete || loadingCreate ? (
        <LoadingSpinner />
      ) : error || errorDelete || errorCreate ? (
        <Message variant='danger'>
          {error || errorDelete || errorCreate}
        </Message>
      ) : (
        <>
          <Table striped responsive bordered hover size='sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className='btn-sm' variant='light'>
                        <i
                          className='fas fa-edit'
                          style={{ color: 'black' }}
                        ></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      className='btn-sm'
                      variant='danger'
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i
                        className='fas fa-trash'
                        style={{ color: 'white' }}
                      ></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pageNum={page} numOfPages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
