import React from 'react';
import classes from './BuildControl.css';
import { Translate } from 'react-localize-redux';

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.ingredientRemoved}
      disabled={props.disabled}
    >
      <Translate id="less" />
    </button>
    <button className={classes.More} onClick={props.ingredientAdded}>
      <Translate id="more" />
    </button>
  </div>
);

export default buildControl;
