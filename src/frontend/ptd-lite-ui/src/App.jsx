import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthRouteGuard } from './components/AuthRouteGuard';
import WelcomePage from './components/WelcomePage';
import Dashboard from './components/Dashboard';
import Cards from './components/Cards';
import Statistics from './components/Statistics';
import Archives from './components/Archives';
import CardItem from './components/CardItem';
import Sidebar from './components/Sidebar';

function App() {
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
