import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CardHome, CardHomeInterno,CardHomeInternoAcom } from './styled';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import BedIcon from '@mui/icons-material/Bed';
import Card from './Card';

export default function BoxComponent() {
  return (
    <CardHome>
{/* 
      <Card
      teste={'Matheus'}
      /> */}
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



      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 250,
            height: 150,
            backgroundColor: '#f5f5f5',
            marginTop: -5,
            marginLeft: '50px',
            borderRadius: '10px',
          }}
        >
          <CardHomeInternoAcom>
            <div>
              <BedIcon sx={{ fontSize: 85, color: '#e7ff4a'}} />
            </div>
            <div>
              <p>ACOMODAÇÕES</p>
              <p>Qtd atual</p>
            </div>
          </CardHomeInternoAcom>

        </Box>
      </div>
      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 250,
            height: 150,
            backgroundColor: '#f5f5f5',
            marginTop: -5,
            marginLeft: '50px',
            borderRadius: '10px',
          }}
        >
          <CardHomeInterno>
            <div>
              <LoginIcon sx={{ fontSize: 80, color: '#7f77ff', marginTop: 2 }} />
            </div>
            <div>
              <p>CHECK IN</p>
              <p>Qtd atual</p>
            </div>
          </CardHomeInterno>
        </Box>
      </div>
      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 250,
            height: 150,
            backgroundColor: '#f5f5f5',
    
            marginTop: -5,
            marginLeft: '50px',
            borderRadius: '10px',
          }}
        > 
            <CardHomeInterno>
            <div>
              <LogoutIcon sx={{ fontSize: 80, color: '#ff877d', marginTop: 2 }} />
            </div>
            <div>
              <p>CHECK OUT</p>
              <p>Qtd atual</p>
            </div>
          </CardHomeInterno>
        </Box>
      </div>

    </CardHome>
  );
}

