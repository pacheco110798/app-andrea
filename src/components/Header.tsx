import { Card } from 'primereact/card';
import React from 'react';
import { Button } from 'primereact/button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../features/auth/authSlice';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    alert('User not found, logging out');
    dispatch(logout());
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // center horizontally
        alignItems: 'center',
      }}
    >
      {' '}
      <Card style={{ alignSelf: 'center', width: '95%' }}>
        <div className='flex justify-content-end'>
          <Button
            icon='pi pi-sign-out'
            label='Cerrar sesión'
            className='p-button-text'
            onClick={(e) => dispatch(logout())}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center', // vertically center image + text
            gap: '1rem', // spacing between image and text
          }}
        >
          <img
            src={user?.image}
            alt={`${user?.firstName} ${user?.lastName}`}
            style={{
              width: '10%',
              height: '10%',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <h1 color='secondary'>Bienvenida de nuevo!</h1>
          <h2 color='secondary'>
            {' ' + user?.firstName + ' ' + user?.lastName}
          </h2>
        </div>
      </Card>
    </div>
  );
};
