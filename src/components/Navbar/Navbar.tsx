import { useState, type MouseEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Box, Button, Menu, MenuItem } from '@mui/material';
import { NoAccounts, AccountCircle } from '@mui/icons-material';
import { UserContext } from '../../contexts/Users';

// Images
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { current, handleLogOut } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
      <Box
        sx={{
          backgroundColor: '#ff613a',
          padding: '0px 12px',
          height: '80px'
        }}
        alignItems="center"
      >
        <Stack flexDirection="row" sx={{ width: '100%', height: '100%' }} justifyContent="space-between" alignItems="center">
          <Box>
            <Link to="/">
              <img src={logo} alt="Logo KoutoKiKoupe" width="60" height="60" />
            </Link>
          </Box>
          <Box>
            <h1 className="site-title">Kouto Ki Koup</h1>
          </Box>
          <Box>
            {!current && (
              <>
                <Link to="/login" className="link">
                  <NoAccounts sx={{ fontSize: 40 }} htmlColor="white" />
                </Link>
              </>
            )}
            {current && (
              <>
                <Button variant="outlined" onClick={() => navigate('/addproduct')} sx={{ borderColor: '#fff', color: '#fff' }}>
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
                  <MenuItem onClick={() => handleLogOut()}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Stack>
      </Box>
  );
};

export default Navbar;