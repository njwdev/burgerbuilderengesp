import React, { useEffect, Suspense, lazy } from 'react';
import Layout from './hoc/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';

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
  const { initialize } = props;
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.token !== null);

  useEffect(() => {
    const onTryAutoSignup = () => dispatch(actions.authCheckState());
    onTryAutoSignup();
    initialize({
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
      <Route path="/" exact render={props => <BurgerBuilder {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" render={props => <Logout {...props} />} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact render={props => <BurgerBuilder {...props} />} />
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

export default withLocalize(withRouter(app));
