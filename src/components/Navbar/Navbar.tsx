import { useState, useEffect, type MouseEvent, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { NoAccounts, AccountCircle } from '@mui/icons-material';
import { UserContext } from '../../contexts/Users';

import logo from '../../assets/logo.png';

const Navbar = () => {
    const { current, handleLogOut } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const LogOut = () => {
        handleLogOut();
        navigate('/login');
    };

    const handleMenuItemClick = (path: string) => {
        setAnchorEl(null);
        navigate(path);
    };

    useEffect(() => {
        setAnchorEl(null);
    }, [location]);

    return (
        <Box
            sx={{
                backgroundColor: '#ff613a',
                height: '80px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                zIndex: 1000,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            >
                <Link to="/">
                    <img src={logo} alt="Logo KoutoKiKoupe" width="60" height="60" />
                </Link>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
                <h1 style={{ color: 'white', fontSize: '2rem', margin: 0 }}>Kouto Ki Koup</h1>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    gap: '8px',
                }}
            >
                {!current && (
                    <>
                        <Link to="/login" className="link">
                            <NoAccounts sx={{ fontSize: 40 }} htmlColor="white" />
                        </Link>
                    </>
                )}
                {current && (
                    <>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/addproduct')}
                            sx={{ borderColor: '#fff', color: '#fff' }}
                        >
                            Add a kouto
                        </Button>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <AccountCircle sx={{ fontSize: 40 }} htmlColor="white" />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                        >
                            <MenuItem onClick={() => handleMenuItemClick('/profile')}>Profile</MenuItem>
                            <MenuItem onClick={() => LogOut()}>Logout</MenuItem>
                        </Menu>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Navbar;
