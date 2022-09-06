import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {ModalCentral, ModalDireita, ModalEsquerda } from './styled';

export default function Modal({ onClose } : any) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
       <Box sx={style}>
        <div>
         <h1>Teste</h1>
          <Button variant="outlined" color="error" onClick={onClose}>Voltar</Button>
        </div>
      </Box >
      <button onClick={onClose} >Saida</button>
    </div>
  )
}
