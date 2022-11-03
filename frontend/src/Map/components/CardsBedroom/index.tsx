import React from "react";
import { Box} from "@mui/material";
import {  ModalInternaFloors,ModalBox } from './styled';
import { range } from "ramda";
import Grid from '@mui/material/Unstable_Grid2';

type Props = {
  units: number;
  getRoomColor: (x,y) => string;
  openModal: (x,y) => void;
  getRoomName: (x,y) => string | undefined;
}


export default function formFloorRooms(props: Props) {

      const floors = range(0, props.units + 2)
      return (
        <ModalBox>
          
          {floors.map((floor, x) => (
            <ModalInternaFloors key={floor}>
              <Box sx={{ flexGrow: 2, width: '1100px', display: 'flex', justifyContent: 'center' }}> 
                <Box sx={{ flexGrow: 1,display: 'flex', justifyContent: 'center'}}>
                  
                  {floors.map((_, y) => (
                    <Grid xs={2} sm={2} md={2} lg={2} key={y}>
                      <Box
                        sx={{
                          borderRadius:2,
                          width: 90,
                          height: 60,
                          backgroundColor: props.getRoomColor(x, y),
                          color: '#fff',
                          boxShadow: '5px 5px 16px 3px rgba(0,0,0,0.2)',
                          margin: 1,  
                          border: '1px solid var(--text-secondary)',
                        }}
                        onClick={()=> props.openModal(x,y)}
                      >{props.getRoomName(x, y)}-{x},{y}</Box>
                    </Grid>
                  ))
                  
                  }
                </Box>
              </Box>
            </ModalInternaFloors>
          ))
        
          }
        </ModalBox>
      )
    }


