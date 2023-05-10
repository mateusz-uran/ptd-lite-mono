import React from 'react';
import Divider from '@mui/material/Divider';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import CardsList from '../CardList/CardsList';

function Navbar(props) {
    const { user, logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const { themeMode } = props;

    return (
        <div className={`${themeMode ? 'dark bg-slate-700' : 'bg-blue-200'}`}>
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
                </div>
            </div>
            <Divider sx={{ borderBottomWidth: 2, marginBottom: 0 }} />
            {
                isAuthenticated && user.nickname &&
                <div>
                    <CardsList mode={themeMode} user={user.nickname} />
                </div>
            }
        </div >
    );
}

export default Navbar;
