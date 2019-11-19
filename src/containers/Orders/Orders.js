import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);

  let orderList = <Spinner />;
  if (!props.loading) {
    orderList = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{orderList}</div>;
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    orders: state.order.orders,
    loading: state.order.loading,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(orders, axios));
