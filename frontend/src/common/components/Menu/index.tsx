import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Menu, MenuButton, IconSaida, HeaderMenu } from './styled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PersonIcon from '@mui/icons-material/Person';
import BedIcon from '@mui/icons-material/Bed';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../../store/authSlice';
import InputAd from '../InputAdministrativo/InputAdm';



export function AsideMenu(props: { children: React.ReactNode, header: React.ReactNode | string, name: string, jobTitle: string }) {
  const router = useRouter();
  const email = useSelector(selectEmail);

  return (
    <div style={{ display: 'flex', backgroundColor: '#EEE9E9' }}>

      <Box
        sx={{
          width: 250,
          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Menu>
          <h2>HOTEL INN REDE</h2>
          <AccountCircleIcon color="disabled" sx={{ fontSize: 140 }} />
          <p>{email}</p>
          <h3>{props.jobTitle}</h3>

        </Menu>
        <MenuButton>
          <h3>MENU</h3>
          <Button size="large" onClick={() => { router.push("/home") }} style={{ textAlign: 'left' }} startIcon={<HomeIcon />}>Home</Button>
          <Button size="large" startIcon={<BedIcon />}>Mapa Dos Quartos</Button>
          <Button size="large" startIcon={<EventAvailableIcon />}>Reserva</Button>
          <Button size="large" onClick={() => { router.push("/guest") }} startIcon={<PermContactCalendarIcon />}>Hopedes</Button>
          <Button size="large" onClick={() => { router.push("/employees") }} startIcon={<PersonIcon />}>Funcionários</Button>
          <InputAd />
        </MenuButton>
      </Box>

      <div>
        <HeaderMenu onClick={() => { router.push("/") }}>

          <IconSaida>

            <h3 >Sair</h3>
            <div>
              <LogoutIcon sx={{ fontSize: 30, color: '#fff', marginTop: 2 }} />
            </div>

          </IconSaida>
        </HeaderMenu>
        {props.header}
        <main>
          {props.children}
        </main>
      </div>
    </div>
  );

}
