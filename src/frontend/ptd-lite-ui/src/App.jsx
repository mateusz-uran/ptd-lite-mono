import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Sidebar from './components/Sidebar';
import { AuthRouteGuard } from './features/auth/AuthRouteGuard';
import Dashboard from './components/Dashboard';
import Cards from './components/Cards';
import Statistics from './components/Statistics';
import Archives from './components/Archives';
import CardSpecification from './features/cards/CardSpecification';
import { useSelector } from 'react-redux';
import { isModalOpen } from './features/modal/modalSlice';
import Modal from './features/modal/Modal';

function App() {
  const isOpen = useSelector(isModalOpen);
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
        { path: '/home/cards/:cardNumber', element: <CardSpecification /> },
      ],
    },
  ]);

  return (
    <>
      {isOpen && <Modal />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
