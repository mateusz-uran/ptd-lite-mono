import React from 'react';
import Divider from '@mui/material/Divider';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, useTheme } from '@mui/material';
import CardsList from '../CardList/CardsList';
import { useTranslation } from 'react-i18next';

function Navbar(props) {
    const { t } = useTranslation();
    const { user, logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const theme = useTheme()

    return (
        <div className={`${theme.palette.mode === 'dark' ? 'dark bg-slate-700' : 'bg-blue-200'}`}>
            <div className='p-4 flex justify-between items-center'>
                <div className='flex'>
                    &nbsp;
                    {!isAuthenticated && !isLoading &&
                        <div className='mx-2'>
                            <Button onClick={() => loginWithRedirect()} variant="contained" sx={{ fontWeight: 'bold' }}>{t('navbar.login')}</Button>
                        </div>
                    }
                </div>
                <div className='flex'>
                    <div className='mx-2'>
                        {isAuthenticated && !isLoading &&
                            <Button onClick={() => logout()} variant="contained" sx={{ fontWeight: 'bold' }}>{t('navbar.logout')}</Button>
                        }
                    </div>
                </div>
            </div>
            <Divider sx={{ borderBottomWidth: 2, marginBottom: 0 }} />
            {
                isAuthenticated && user.nickname &&
                <div>
                    <CardsList user={user.nickname} themeProp={theme.palette.mode} />
                </div>
            }
        </div >
    );
}

export default Navbar;
