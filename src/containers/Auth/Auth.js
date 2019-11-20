import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';
import { Translate } from 'react-localize-redux';

const auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        label: <Translate id="emailAddress" />,
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        label: <Translate id="password" />,
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignup, setIsSignup] = useState(true);
  //dispatch
  const dispatch = useDispatch();
  const onAuth = (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup));
  //state
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const buildingBurger = useSelector(state => state.burgerBuilder.building);
  const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

  useEffect(() => {
    const onSetAuthRedirectPath = () =>
      dispatch(actions.setAuthRedirectPath('/'));
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation,
        ),
        touched: true,
      }),
    });

    setControls(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      label={formElement.config.elementConfig.label}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (error) {
    errorMessage = <p>{error.message} </p>;
  }

  let authRedirect = null;

  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">
          <Translate id="submit" />
        </Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        {isSignup ? <Translate id="auth" /> : <Translate id="signUp" />}
      </Button>
    </div>
  );
};

export default auth;
