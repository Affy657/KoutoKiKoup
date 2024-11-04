import { useState, useContext } from 'react';
import { TextField, Stack, Button, FormControlLabel, Checkbox, Typography, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { performRequest } from '../../api/api';
import { UserContext } from '../../contexts/Users';
import type { BaseUser } from '../../type';

interface LoginDataRequest {
  username: string;
  password: string;
}

interface LoginDataResponse extends BaseUser {
  token: string;
  message?: string;
}

enum RequestType {
  Login = 'login',
  Register = 'signup'
}

export default function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setCurrent, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggle(event.target.checked);
  }

  const handleSubmit = (type: RequestType) => {
    return (event: React.FormEvent<HTMLButtonElement>) => {
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
      setLoading(true);
      const config = {
        method: 'POST',
        url: '/users/' + type,
        data: {
          username,
          password
        }
      }
  
      const cancelRequest = performRequest<LoginDataResponse, LoginDataRequest>(config, (response, err) => {
        setLoading(false);
        if (err) {
          setError(err.response?.data?.message ?? err.message);
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
          navigate('/');
        }
      });
  
      return () => {
        setLoading(false);
        cancelRequest('Request cancelled by unmount');
      }
    }
  }

  return (
    <>
      <Typography variant="h4">Login to your account</Typography>

      <FormControl sx={{ width: '100%' }}>
        <Stack alignItems="center" sx={{ width: '100%' }}>
          <Stack sx={{ width: '60%', paddingTop: '4rem' }} gap={4}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
              id="username-form"
              label="Username"
              variant="filled"
              autoComplete="text"
              type="text"
              required={true}
              onChange={handleUsernameChange}
            />
            <TextField
              id="password-form"
              label="Password"
              variant="filled"
              autoComplete="password"
              type="password"
              required={true}
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              required
              control={<Checkbox onChange={handleToggleChange} />}
              label="Accepter les Conditions Générales d'Utilisation, les cookies, les Conditions de Confidentialité, les Conditions Générales de Vente, les Conditiones Générales de Vente de Donnée Personnel et vous donnez le consentement non exhaustif de ce que nous pourrons faire plus tard, ect..."
            />

            <Stack direction="row" gap={2} sx={{ width: '100%' }}>
              {loading && <Button variant="contained" color="primary" size="large" sx={{ width: '100%' }} disabled>Loading...</Button>}
              {!loading && <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ width: '100%' }}
                type="submit"
                onSubmit={handleSubmit(RequestType.Login)}
                onClick={handleSubmit(RequestType.Login)}
              >Login</Button>}
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ width: '100%' }}
                onSubmit={handleSubmit(RequestType.Register)}
                onClick={handleSubmit(RequestType.Register)}
              >Register</Button>
            </Stack>
          </Stack>
        </Stack>
      </FormControl>
    </>
  )
}