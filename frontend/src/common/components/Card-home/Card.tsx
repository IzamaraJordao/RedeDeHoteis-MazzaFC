import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CardHome, CardHomeInterno,CardHomeInternoAcom } from './styled';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import BedIcon from '@mui/icons-material/Bed';

export default function Card(props: any) {
  return (
    <div>
              <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 250,
            height: 150,
            backgroundColor: '#f5f5f5',
            marginTop: -5,
            marginLeft: '320px',
            borderRadius: '10px',
          }}
        >
          <CardHomeInterno>
            <h1>{props.teste}</h1>
            <div>
              <PeopleAltIcon sx={{ fontSize: 80, color: '#2dd8ac', marginTop: 2 }} />
            </div>
            <div>
              <p>HOSPEDES</p>
              <p>Qtd atual</p>
            </div>
          </CardHomeInterno>

        </Box>
    </div>
  )
}
