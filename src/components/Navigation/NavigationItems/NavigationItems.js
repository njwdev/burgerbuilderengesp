import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import { Translate } from 'react-localize-redux';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">
      <Translate id="burgerBuilder" />
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders">
        <Translate id="orders" />
      </NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">
        <Translate id="auth" />
      </NavigationItem>
    ) : (
      <NavigationItem link="/logout">
        <Translate id="logout" />
      </NavigationItem>
    )}
    <LanguageToggle />
  </ul>
);

export default navigationItems;
