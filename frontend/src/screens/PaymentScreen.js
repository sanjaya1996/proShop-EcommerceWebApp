import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import * as cartActions from '../store/actions/cartActions';

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(cartActions.savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Check
            type='radio'
            id='PayPal'
            name='paymentMethod'
            label='Paypal or Credit Card'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group>
          <Form.Check
            type='radio'
            id='Stripe'
            name='paymentMethod'
            label='Stripe'
            value='Stripe'
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Form.Group> */}

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
