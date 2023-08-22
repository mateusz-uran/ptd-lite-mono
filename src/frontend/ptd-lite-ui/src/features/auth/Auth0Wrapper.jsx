import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAuthAccessToken, setAuthUserInformation } from './auth0Slice';
import Loading from './Loading';

export const namespace = import.meta.env.VITE_AUTH0_NAMESPACE;

const Auth0Wrapper = ({ children }) => {
  const [tokenLoading, setTokenLoading] = useState(true);
  const dispatch = useDispatch();
  const { getAccessTokenSilently, isLoading, user, isAuthenticated } =
    useAuth0();

  const fetchAccessToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      dispatch(setAuthAccessToken({ token: token }));
      setTokenLoading(false); // Token is now available
    } catch (error) {
      console.log(error);
      setTokenLoading(false); // Token fetching failed
    }
  };

  const fetchUserInformation = async () => {
    try {
      if (user) {
        const userRoles = user[namespace] || [];
        const username = user.nickname;
        dispatch(
          setAuthUserInformation({ permissions: userRoles, username: username })
        );
      }
    } catch (err) {
      console.log('user info: ', err);
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  useEffect(() => {
    fetchUserInformation();
  }, [isAuthenticated, user]);

  if (isLoading || tokenLoading) {
    return <Loading />;
  }

  return children;
};
export default Auth0Wrapper;
