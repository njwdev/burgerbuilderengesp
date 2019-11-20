import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { useDispatch } from 'react-redux';

const logout = props => {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    const onLogout = () => dispatch(actions.logout());
    onLogout();
  }, []);

  return <Redirect to="/" />;
};

export default logout;
