import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { Translate } from 'react-localize-redux';

const controls = [
  { label: <Translate id="salad" />, type: 'salad' },
  { label: <Translate id="onion" />, type: 'onion' },
  { label: <Translate id="bacon" />, type: 'bacon' },
  { label: <Translate id="cheese" />, type: 'cheese' },
  { label: <Translate id="meat" />, type: 'meat' },
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      <strong>
        <Translate id="currentPrice" />
        {props.price.toFixed(2)}
      </strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.type}
        label={ctrl.label}
        ingredientAdded={() => props.ingredientAdded(ctrl.type)}
        ingredientRemoved={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.purchasing}
    >
      {props.isAuth ? (
        <Translate id="orderNow" />
      ) : (
        <Translate id="signUpToOrder" />
      )}
    </button>
  </div>
);

export default buildControls;
