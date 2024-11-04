import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { UserContext } from '../../contexts/Users';

import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { current } = useContext(UserContext);

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
              {!current && <Link to="/login">
                <NoAccountsIcon sx={{
                  fontSize: 40
                }} htmlColor="white"/>
              </Link>}
              {current && <Link to="/users">
                <AccountCircleIcon sx={{
                  fontSize: 40
                }} htmlColor="white"/>
              </Link>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Navbar;