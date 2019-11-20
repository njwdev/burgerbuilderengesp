import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {
  //state

  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const purchased = useSelector(state => state.order.purchased);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;
  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.path + '/contact-data'}
          render={props => <ContactData {...props} />}
        />
      </div>
    );
  }
  return summary;
};

export default checkout;
