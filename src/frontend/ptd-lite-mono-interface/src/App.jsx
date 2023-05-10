import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CardSpecification from './components/CardSpecification/CardSpecification';
import ErrorPage from './components/misc/ErrorPage';
import AddTrip from './components/Trip/AddTrip';
import AddFuel from './components/Fuel/AddFuel';
import { createTheme, Switch, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const handleChangeTheme = (event) => {
    setDarkMode(event.target.checked);
    localStorage.setItem('theme', JSON.stringify(event.target.checked));
  }

  const darkTheme = createTheme(darkMode ?
    {
      palette: {
        mode: 'dark',
      },
    } : {
      palette: {
        mode: 'light',
      }
    }
  )

  useEffect(() => {
    let availableTheme = JSON.parse(localStorage.getItem('theme'));
    availableTheme && setDarkMode(availableTheme);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/", element: <Navbar themeMode={darkMode} />,
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

  return (
    <div className={`h-screen ${darkMode ? 'dark bg-slate-700' : 'bg-blue-200'}`}>
      <div className='flex items-center justify-end px-4'>
        <WbSunnyIcon className={darkMode ? 'text-blue-200' : 'text-white'} />
        <Switch
          checked={darkMode}
          onChange={handleChangeTheme}
        />
        <DarkModeIcon className={darkMode ? 'text-white' : ''} />
      </div>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App
