import { Grid2 } from '@mui/material';

import './Login.css';

import Knife3D from './Knife3D';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <Grid2 container>
      <Grid2 size={6} justifyItems="center" sx={{ paddingTop: '4rem' }}>
        <LoginForm />
      </Grid2>
      <Grid2 size={6}>
        <Knife3D />
      </Grid2>
    </Grid2>
  )
}