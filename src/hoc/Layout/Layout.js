import React, { useState } from 'react';
import Aux from '../../hoc/Aux/Aux';
import { useSelector } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  //redux state

  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <div className={classes.Background}>
        <main className={classes.Content}>{props.children}</main>
      </div>
    </Aux>
  );
};

export default layout;
