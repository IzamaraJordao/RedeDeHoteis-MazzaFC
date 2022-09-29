import * as React from 'react';
import Box from '@mui/material/Box';
import {CardHomeInterno } from './styled';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import BedIcon from '@mui/icons-material/Bed';

export const styledMedia = {
  '@media (max-width: 1435px)': {
    fontSize: 65,
  }, 
  '@media (max-width: 1230px)': {
    display: 'none',
  },
  '@media (max-width: 1030px)': {
    display: 'none',

  } 
}


export default function Card(props: any) {

  function icon() {
    if (props.titulo === "HOSPEDES") {
      return <PeopleAltIcon sx={{ fontSize: 85, color: '#2dd8ac', ...styledMedia  }} />
    }
    if (props.titulo === "ACOMODAÇÕES") {
      return <BedIcon sx={{ fontSize: 85, color: '#e7ff4a', ...styledMedia
    
    }} />
    }
    if (props.titulo === "CHECK IN") {
      return <LoginIcon sx={{ fontSize: 80, color: '#7f77ff', ...styledMedia }} />
    }
    if (props.titulo === "CHECK OUT") {
      return <LogoutIcon sx={{ fontSize: 80, color: '#ff877d', ...styledMedia }} />
    }else{
      return null
    }
  }
  
  return (
    <div>
              <Box
           sx={{
            display: 'flex',
            width: 250,
            height: 120,
            backgroundColor: '#fff',
            margin: '20px',
            borderRadius: '5px',


            '@media (max-width: 1435px)': {
              width: 200,
              height: 80,
            },

            '@media (max-width: 1230px)': {
              width: 150,
              height: 80,
              // margin:0
            },
            '@media (max-width: 1030px)': {
              width: 100,
              height: 60,
            }

          }}
        >
          <CardHomeInterno>          
            <div>
              {icon()}
            </div>
            <div>
              <p >{props.titulo}</p>
              <p >Qtd atual</p>
            </div>
          </CardHomeInterno>

        </Box>
    </div>
  )
}
