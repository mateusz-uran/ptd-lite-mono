import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Divider from '@mui/material/Divider';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import CardsList from '../CardList/CardsList';

function Navbar(props) {
    const { user, logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

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

    return (
        <div className={`${darkMode ? 'dark bg-slate-700' : 'bg-blue-200'}`}>
            <ThemeProvider theme={darkTheme}>
                <div className='p-4 flex justify-between items-center'>
                    <div className='flex'>
                        &nbsp;
                        {!isAuthenticated && !isLoading &&
                            <div className='mx-2'>
                                <Button onClick={() => loginWithRedirect()} variant="contained" sx={{ fontWeight: 'bold' }}>Login</Button>
                            </div>
                        }
                    </div>
                    <div className='flex'>
                        <div className='mx-2'>
                            {isAuthenticated && !isLoading &&
                                <Button onClick={() => logout()} variant="contained" sx={{ fontWeight: 'bold' }}>Logout</Button>
                            }
                        </div>
                        <div className='flex items-center'>
                            <WbSunnyIcon className={darkMode ? 'text-blue-200' : 'text-white'} />
                            <Switch
                                checked={darkMode}
                                onChange={handleChangeTheme}
                            />
                            <DarkModeIcon className={darkMode ? 'text-white' : ''} />
                        </div>
                    </div>
                </div>
                <Divider sx={{ borderBottomWidth: 2, marginBottom: 0 }} />
                {
                    isAuthenticated && user.nickname &&
                    <div>
                        <CardsList mode={darkMode} user={user.nickname} />
                    </div>
                }
            </ThemeProvider >
        </div >
    );
}

export default Navbar;
