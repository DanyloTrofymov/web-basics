import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import {
  LoginPage,
  SignupPage,
  ConfirmEmailPage,
  ForgotPasswordPage,
  RestorePasswordPage,
  NotFoundPage
} from '../common/pages';
import ProtectedRoute from '../common/utils/protectedRoute.util';
import PublicRoute from '../common/utils/publicRoute.util';
import { Navbar } from '../common/components/navbar/navbar.component';

export const MainRouter = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path={APP_KEYS.ROUTER_KEYS.LOGIN} exact>
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      </Route>
      <Route path={APP_KEYS.ROUTER_KEYS.SIGNUP} exact>
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      </Route>
      <Route path={APP_KEYS.ROUTER_KEYS.CONFIRM_EMAIL} exact>
        <PublicRoute>
          <ConfirmEmailPage />
        </PublicRoute>
      </Route>
      <Route path={APP_KEYS.ROUTER_KEYS.RESTORE_PASSWORD} exact>
        <PublicRoute>
          <RestorePasswordPage />
        </PublicRoute>
      </Route>
      <Route path={APP_KEYS.ROUTER_KEYS.FORGOT_PASSWORD} exact>
        <PublicRoute>
          <ForgotPasswordPage />
        </PublicRoute>
      </Route>
      <Route path={APP_KEYS.ROUTER_KEYS.ROOT} exact>
        <ProtectedRoute>
          <HomePageContainer />
        </ProtectedRoute>
      </Route>
      <Route component={NotFoundPage} path="*" />
    </Switch>
  </Router>
);
