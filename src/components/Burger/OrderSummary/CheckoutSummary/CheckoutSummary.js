import React from 'react';
import Burger from '../../Burger';
import Button from '../../../UI/Button/Button';
import classes from './CheckoutSummary.css';
import { Translate } from 'react-localize-redux';

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>
        <span role="img" aria-label="heart eyes">
          😍
        </span>
        <Translate id="enjoyScreen" />
        <span role="img" aria-label="heart eyes">
          😍
        </span>
      </h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        <Translate id="cancel" />
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        <Translate id="continue" />
      </Button>
    </div>
  );
};

export default checkoutSummary;
