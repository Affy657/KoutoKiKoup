import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { Button, Menu, MenuItem } from '@mui/material';
import React from "react";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
      <Box sx={{ flexGrow: 1 }} className="header" alignItems="center">
        <Grid container spacing={3} alignItems="center">
          <Grid size="grow">
            <Link to="/">
              <img src={logo} alt="Logo KoutoKiKoupe" width="120" height="120" />
            </Link>
          </Grid>
          <Grid size={6} sx={{ textAlign: 'center' }}>
            <h1 className="site-title">Kouto Ki Koup</h1>
          </Grid>
          <Grid>
            <Grid container size="grow" className="center" alignItems="center" gap={2}>
              <Grid alignItems="center">
                <input className="search-bar" type="text" placeholder="Search Kouto..." />
              </Grid>
              <Grid alignItems="center">
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                  <AccountCircleIcon sx={{ fontSize: 40 }} htmlColor="white" />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                >
                  <MenuItem onClick={() => handleMenuItemClick('/login')}>Login</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('/logout')}>Logout</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Navbar;