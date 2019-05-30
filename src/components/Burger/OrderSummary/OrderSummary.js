import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import { Translate } from 'react-localize-redux';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span>
            {/* // style={{ textTransform: 'capitalize' }}> */}
            <Translate id={igKey} />
          </span>
          : {this.props.ingredients[igKey]}
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
          ${this.props.price.toFixed(2)}{' '}
        </p>
        <p>
          <Translate id="continueToCheckout" />
        </p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          <Translate id="cancel" />
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          <Translate id="continue" />
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
