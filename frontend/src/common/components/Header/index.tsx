import * as React from 'react';
import Box from '@mui/material/Box';
import {External} from './styled';

export default function index(props: any) {
  return (
    <External>
      <Box
        sx={{
          width:'95%',
          height: 120,
          backgroundColor: '#fff',
          marginTop: -7,    
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 50,
          color: 'var(--text)',
        }}
      >

        {props.title}
      </Box>
    </External>
  )
}

