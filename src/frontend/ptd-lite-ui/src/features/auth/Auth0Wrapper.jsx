import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAuthContext } from './auth0Slice';
import Loading from './Loading';

const Auth0Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  const auth0 = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await auth0.getAccessTokenSilently();
        dispatch(setAuthContext(token));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, [auth0, dispatch]);

  return loading ? <Loading /> : children;
};
export default Auth0Wrapper;
