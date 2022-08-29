import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {Menu, MenuButton} from './styled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BedIcon from '@mui/icons-material/Bed';
// import './menu.scss';

export default function BoxSx() {
  return (
    <div className='header'>
      <div >
    
        <Box
          sx={{
            width: 250,
            height: 700,
            backgroundColor: '#f5f5f5',
            borderRadius: '5px',
            border: '1px solid #3f3c57',
          }}
        >
          <Menu>
          <h2>HOTEL INN REDE</h2>
          <AccountCircleIcon color="disabled" sx={{ fontSize: 140 }} />
          <p>Matheus Barbosa</p>
          <h3>Gerente</h3>
          </Menu>

          <MenuButton>
          <h3>MENU</h3>
          <Button size="large" style={{ textAlign: 'left' }} startIcon={<HomeIcon />}>Home</Button>
          <Button size="large" startIcon={<BedIcon />}>Mapa Dos Quartos</Button>
          <Button size="large" startIcon={<EventAvailableIcon />}>Reserva</Button>
          <Button size="large" startIcon={<PermContactCalendarIcon />}>Hopedes</Button>
          <Button size="large" startIcon={<PersonIcon />}>Funcionários</Button>
          <Button size="large" startIcon={<LockOpenIcon />}>Administrativo</Button>
          </MenuButton> 
          


        </Box>
      </div>
      <div>

      </div>
    </div>
  );

}
