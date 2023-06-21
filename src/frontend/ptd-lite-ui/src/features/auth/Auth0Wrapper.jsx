import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAuthContext } from './auth0Slice';

const Auth0Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  const auth0 = useAuth0();

  useEffect(() => {
    if (auth0.isAuthenticated) {
      const fetchAccessToken = async () => {
        const token = await auth0.getAccessTokenSilently();
        dispatch(setAuthContext(token));
      };
      fetchAccessToken();
    }
  }, [auth0]);

  return children;
};
export default Auth0Wrapper;
