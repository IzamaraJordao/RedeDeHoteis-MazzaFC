import React from 'react';
import { Navigate } from 'react-router';
import BoxHome from '../common/components/BoxHome';

//fazer rota privada para o home

export default function home() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const Private = () => {
    if (email === email && password === password) {
     
    }

  }
  return (
      <BoxHome/>
  )
}
 