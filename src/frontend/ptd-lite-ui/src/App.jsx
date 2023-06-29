import './App.css';
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from 'react-router-dom';
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
import FuelAddForm from './features/fuel/FuelAddForm';
import TripAddForm from './features/trips/TripAddForm';
import ErrorPage from './components/ErrorPage';
import CallbackPage from './features/auth/CallbackPage';

function App() {
  const isOpen = useSelector(isModalOpen);
  const router = createBrowserRouter([
    { path: '/', element: <WelcomePage />, errorElement: <ErrorPage /> },
    { path: '/callback', element: <CallbackPage /> },
    {
      path: '/home',
      element: <Sidebar />,
      children: [
        { path: '/home/dashboard', element: <Dashboard /> },
        { path: '/home/cards', element: <Cards /> },
        { path: '/home/stats', element: <Statistics /> },
        { path: '/home/archive', element: <Archives /> },
        {
          path: '/home/cards/:cardNumber/:cardId',
          element: <CardSpecification />,
        },
        {
          path: '/home/cards/:cardNumber/:cardId/add/:type',
          element: <FuelAddForm />,
        },
        {
          path: '/home/cards/:cardNumber/:cardId/add/trip',
          element: <TripAddForm />,
        },
      ],
    },
  ]);

  return (
    <>
      {isOpen && <Modal />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/home" element={<AuthRouteGuard component={Sidebar} />}>
          <Route path="/home/dashboard" element={<Dashboard />} />
          <Route path="/home/cards" element={<Cards />} />
          <Route path="/home/stats" element={<Statistics />} />
          <Route path="/home/archive" element={<Archives />} />
          <Route
            path="/home/cards/:cardNumber/:cardId"
            element={<CardSpecification />}
          />
          <Route
            path="/home/cards/:cardNumber/:cardId/add/:type"
            element={<FuelAddForm />}
          />
          <Route
            path="/home/cards/:cardNumber/:cardId/add/trip"
            element={<TripAddForm />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
