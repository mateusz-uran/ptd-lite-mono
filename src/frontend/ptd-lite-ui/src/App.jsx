import './App.css';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Sidebar from './components/Sidebar';
import { AuthRouteGuard } from './features/auth/AuthRouteGuard';
import Dashboard from './components/Dashboard';
import Statistics from './components/Statistics';
import Archives from './components/Archives';
import CardSpecification from './features/cards/components/CardSpecification';
import { useSelector } from 'react-redux';
import { isModalOpen } from './features/modal/slices/modalSlice';
import Modal from './features/modal/components/Modal';
import FuelAddForm from './features/fuel/forms/FuelAddForm';
import TripAddForm from './features/trips/forms/TripAddForm';
import ErrorPage from './components/ErrorPage';
import CallbackPage from './features/auth/CallbackPage';
import CargoForm from './features/trips/forms/TripCargoForm';
import Cards from './features/cards/components/Cards';

function App() {
  const isOpen = useSelector(isModalOpen);

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
            path="/home/:compName/:cardNumber/:cardId"
            element={<CardSpecification />}
          />
          <Route
            path="/home/:compName/:cardNumber/:cardId/add/:type"
            element={<FuelAddForm />}
          />
          <Route
            path="/home/:compName/:cardNumber/:cardId/add/trip"
            element={<TripAddForm />}
          />
          <Route
            path="/home/:compName/:cardNumber/:cardId/createcargo"
            element={<CargoForm />}
          />
          <Route
            path="/home/:compName/:cardNumber/:cardId/upgradecargo"
            element={<CargoForm />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
