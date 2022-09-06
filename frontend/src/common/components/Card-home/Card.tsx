import * as React from 'react';
import Box from '@mui/material/Box';
import {CardHomeInterno } from './styled';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import BedIcon from '@mui/icons-material/Bed';


export default function Card(props: any) {

  function icon() {
    if (props.titulo === "HOSPEDES") {
      return <PeopleAltIcon sx={{ fontSize: 85, color: '#2dd8ac' }} />
    }
    if (props.titulo === "ACOMODAÇÕES") {
      return <BedIcon sx={{ fontSize: 85, color: '#e7ff4a'}} />
    }
    if (props.titulo === "CHECK IN") {
      return <LoginIcon sx={{ fontSize: 80, color: '#7f77ff'}} />
    }
    if (props.titulo === "CHECK OUT") {
      return <LogoutIcon sx={{ fontSize: 80, color: '#ff877d'}} />
    }
  }
  
  return (
    <div>
              <Box
           sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            width: 250,
            height: 100,
            backgroundColor: '#fff',
            marginLeft: '20px',
            borderRadius: '5px',
          }}
        >
          <CardHomeInterno>
            <div>
              {icon()}
            </div>
            <div>
              <p>{props.titulo}</p>
              <p>Qtd atual</p>
            </div>
          </CardHomeInterno>

        </Box>
    </div>
  )
}
