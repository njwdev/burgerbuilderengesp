import React, { useEffect, Suspense, lazy } from 'react';
import Layout from './hoc/Layout/Layout';
import { connect } from 'react-redux';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { renderToStaticMarkup } from 'react-dom/server';
import { withLocalize } from 'react-localize-redux';
import globalTranslations from './shared/translations.json';

const Checkout = lazy(() => {
  return import('./containers/Checkout/Checkout');
});
const Orders = lazy(() => {
  return import('./containers/Orders/Orders');
});
const Auth = lazy(() => {
  return import('./containers/Auth/Auth');
});

const app = props => {
  useEffect(() => {
    props.onTryAutoSignup();
    props.initialize({
      languages: [
        { name: '🇬🇧', code: 'en' },
        { name: '🇪🇸', code: 'es' },
      ],
      translation: globalTranslations,
      options: { renderToStaticMarkup },
    });
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withLocalize(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(app)),
);
