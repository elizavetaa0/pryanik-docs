import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../entities/user/model/userSlice';
import { Box, Button, TextField, Typography } from '@mui/material';
import { getLogin } from '../../../shared/api/authApi';

export function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(false);
    setError(null);

    try {
      const response = await getLogin({ username, password });
      dispatch(login({ username, token: response.token }));
      window.location.href = '/';
    } catch (error) {
      setError('Ошибка авторизации. Пожалуйста, проверьте данные.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '10% auto',
        padding: 3,
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h6">Авторизация</Typography>

      <TextField
        label="Логин"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Пароль"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? 'Загрузка...' : 'Войти'}
      </Button>
    </Box>
  );
}
