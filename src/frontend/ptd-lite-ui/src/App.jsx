import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthRouteGuard } from './components/router_guard/AuthRouteGuard';
import WelcomePage from './components/welcome/WelcomePage';
import Dashboard from './components/dashboard/Dashboard';
import Cards from './components/cards/Cards';
import Statistics from './components/statistics/Statistics';
import Archives from './components/archives/Archives';
import CardItem from './components/card_item/CardItem';
import Sidebar from './components/sidebar/Sidebar';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { storeAuthInformation } from './features/auth/authSlice';

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const fetchAccessToken = async () => {
    const token = await getAccessTokenSilently();
    dispatch(storeAuthInformation(token));
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  const router = createBrowserRouter([
    { path: '/', element: <WelcomePage /> },
    {
      path: '/home',
      element: <AuthRouteGuard component={Sidebar} />,
      children: [
        { path: '/home/dashboard', element: <Dashboard /> },
        { path: '/home/cards', element: <Cards /> },
        { path: '/home/stats', element: <Statistics /> },
        { path: '/home/archive', element: <Archives /> },
        { path: '/home/:cardNumber', element: <CardItem /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
