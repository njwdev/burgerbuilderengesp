import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import { Translate } from 'react-localize-redux';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span>
          <Translate id={igKey} />
        </span>
        : {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>
        <Translate id="yourOrder" />
      </h3>
      <p>
        <Translate id="orderSummaryText" />
      </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>
          <Translate id="totalPrice" />
        </strong>
        ${props.price.toFixed(2)}{' '}
      </p>
      <p>
        <Translate id="continueToCheckout" />
      </p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        <Translate id="cancel" />
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        <Translate id="continue" />
      </Button>
    </Aux>
  );
};

export default orderSummary;
