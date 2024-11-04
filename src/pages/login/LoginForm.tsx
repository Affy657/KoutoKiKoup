import { useState, useContext } from 'react';
import { TextField, Stack, Button, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { performRequest } from '../../api/api';
import { UserContext } from '../../contexts/Users';
import type { BaseUser } from '../../type';

interface LoginDataRequest {
  username: string;
  password: string;
}

interface LoginDataResponse extends BaseUser {
  token: string;
}

export default function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setCurrent, setToken } = useContext(UserContext);
  
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!username) {
      setError('Please enter a username');
      return;
    }
    if (!password) {
      setError('Please enter a password');
      return;
    }

    if (!toggle) {
      setError('Please accept the terms and conditions');
      return;
    }
  
    setError(null);
    setLoading(true)

    const cancelRequest = performRequest<LoginDataResponse, LoginDataRequest>({
      method: 'POST',
      url: '/login',
      data: {
        username,
        password
      }
    }, (response, err) => {
      setLoading(false);
      if (err) {
        setError(err.message);
        return;
      }

      if (response) {
        setToken(response.data.token);
        const user = {
          _id: response.data._id,
          username: response.data.username,
          role: response.data.role
        }
        setCurrent(user);
      }
    })

    return () => {
      setLoading(false);
      cancelRequest('Request cancelled by unmount');
    }
  }

  return (
    <>
      <h1>Login to your account</h1>

      {error && <Typography color="error">{error}</Typography>}

      <Stack sx={{ width: '60%', paddingTop: '4rem' }} gap={4}>
        <TextField
          id="username-form"
          label="Username"
          variant="filled"
          autoComplete="text"
          type="text"
          required={true}
        />
        <TextField
          id="password-form"
          label="Password"
          variant="filled"
          autoComplete="password"
          type="password"
          required={true}
        />
        <FormControlLabel required control={<Checkbox />} label="Accepter les Conditions Générales d'Utilisation, les cookies, les Conditions de Confidentialité, les Conditions Générales de Vente, les Conditiones Générales de Vente de Donnée Personnel et vous donnez le consentement non exhaustif de ce que nous pourrons faire plus tard, ect..." />

        <Stack direction="row" gap={2} sx={{ width: '100%' }}>
          {loading}
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ width: '100%' }}
            type="submit"
            onSubmit={handleSubmit}
          >Login</Button>
          <Button variant="outlined" color="primary" size="large" sx={{ width: '100%' }}>Register</Button>
        </Stack>
      </Stack>
    </>
  )
}