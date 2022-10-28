import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { BoxDiv, BoxExternal, InputNomeModal, ModalInternaFloors,ModalBox } from './styled';
import { range } from "ramda";
import Grid from '@mui/material/Unstable_Grid2';


export default function formFloorRooms(props: any) {

      const floors = range(0, props.numberOfRoom + 2)
      return (
        <ModalBox>
  
          {floors.map((floor, x) => (
            <ModalInternaFloors key={floor}>
              <Box sx={{ flexGrow: 1, width: '900px', display: 'flex', justifyContent: 'center', margin: 3 }}>
                <Grid container rowSpacing={{ xs: 1, sm: 1, md: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                  {floors.map((_, y) => (
                    <Grid xs={2} sm={3} md={2} lg={2.4} key={y}>
                      <Box
                        sx={{
                          borderRadius:2,
                          width: 110,
                          height: 70,
                          backgroundColor: props.getRoomColor(x, y),
                          color: '#fff',
                          boxShadow: '5px 5px 16px 3px rgba(0,0,0,0.2)',
                        
                        }}
                        onClick={()=> props.openModal(x,y)}
                      >{props.getRoomName(x, y)}</Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </ModalInternaFloors>
          ))}
        </ModalBox>
      )
    }
