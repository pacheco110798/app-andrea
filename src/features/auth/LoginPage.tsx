import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { login } from './authSlice';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toast = useRef<Toast>(null);
  const { loading, token } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) {
      navigate('/posts');
    }
  }, [token, navigate]);

  const validateForm = () => {
    if (!username.trim()) {
      showToast('error', 'Error', 'El nombre de usuario es obligatorio');
      return false;
    }
    if (!password.trim()) {
      showToast('error', 'Error', 'La contraseña es obligatoria');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const credentials = {
      username,
      password,
    };
    dispatch(
      login({
        credentials,
        onSuccess(data) {
          showToast('success', data.firstName, 'bienvenido');
        },
        onError(message) {
          showToast('error', 'Error al inicar sesión', message);
        },
      })
    );
  };

  const showToast = (
    severity: 'error' | 'success' | 'info' | 'warn' | 'secondary' | 'contrast',
    summary: string = '',
    message: string = ''
  ) => {
    toast?.current?.show({
      severity: severity,
      summary: summary,
      detail: message,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card style={{ marginTop: '200px', width: '90%', maxWidth: '400px' }}>
        <Toast ref={toast} />
        <h2 color='secondary'>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className='p-m-3'>
            <h3>Email</h3>
            <br />
            <InputText
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
            />
          </div>
          <div className='p-m-3'>
            <h3>Contraseña</h3>
            <br />
            <InputText
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
            />
          </div>
          <br></br>
          <Button
            label='Ingresar'
            icon='pi pi-sign-in'
            type='submit'
            loading={loading}
          />
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
