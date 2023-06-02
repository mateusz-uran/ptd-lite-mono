import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import LoadingPage from './LoadingPage';

export const AuthRouteGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LoadingPage />,
  });

  return <Component />;
};
