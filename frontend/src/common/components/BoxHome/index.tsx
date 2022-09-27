import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '../Table'
import Button from '@mui/material/Button';
import { External} from './styled';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function BoxSx() {
  return (
    <Box
      sx={{
        width:  ' calc (100% - 20px)',
        height: 500,
        backgroundColor: '#e1dddd',
        margin: 1,
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <External>
      <div>
      <Button variant="contained"><ArrowBackIosNewIcon/></Button>
      <Button sx={{marginLeft: 3}} variant="contained"><ArrowForwardIosIcon/></Button>
      <EventAvailableIcon sx={{marginLeft: 5, fontSize:45, marginBottom: -2.5}}/>
      </div>
      <div>
      <Table/>
      </div>
      </External>
    </Box>
  );
}
