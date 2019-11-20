import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {
  //dispatch
  const dispatch = useDispatch();

  //redux state

  const token = useSelector(state => state.auth.token);
  const orders = useSelector(state => state.order.orders);
  const loading = useSelector(state => state.order.loading);
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
    const onFetchOrders = (token, userId) =>
      dispatch(actions.fetchOrders(token, userId));
    onFetchOrders(token, userId);
  }, []);

  let orderList = <Spinner />;
  if (!loading) {
    orderList = orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{orderList}</div>;
};

export default withErrorHandler(orders, axios);
