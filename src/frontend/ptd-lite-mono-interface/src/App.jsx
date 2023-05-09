import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CardSpecification from './components/CardSpecification/CardSpecification';
import ErrorPage from './components/misc/ErrorPage';
import AddTrip from './components/Trip/AddTrip';
import AddFuel from './components/Fuel/AddFuel';

function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "card/:cardId",
          element: <CardSpecification />,
        },
        {
          path: "card/:cardId/add-trip",
          element: <AddTrip />,
        },
        {
          path: "card/:cardId/add-fuel",
          element: <AddFuel />,
        },
      ],

    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
