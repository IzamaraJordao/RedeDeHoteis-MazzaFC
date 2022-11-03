import React, { useEffect, useState } from 'react'
import { TituloCenter, ModalExterna } from './styled'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { Bedroom, selectBedroomData } from "../../../store/bedroomSlice";
import CardsBedroom from "../CardsBedroom";
import { Button, Typography } from '@mui/material';
import ModalBedroom from "../ModalBedroom/Modal";
import Swal from 'sweetalert2';
import { type } from 'ramda';
import { bedroomPut } from '../../../api/bedroom/api-bedroomFloors';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';




export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  height: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflow: 'auto',

}

type Props = {
  onClose: () => void
  units: number
  hotelId: string
  numberOfRoom: string
 

}

export default function ModalCards(props: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const rooms = useSelector(selectBedroomData)
  const router = useRouter()
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomSelected, setRoomSelected] = useState<Bedroom | null>(null);
  const [ pos_x, setPos_x ] = useState(0);
  const [ pos_y, setPos_y ] = useState(0);

  console.log("rooms",rooms.map((room) => room.id))

  function getRoomName(x: number, y: number) {
    const room = rooms.find((room) => room.position_x === x && room.position_y === y)
    return room?.name
  }

  function getRoomColor(x: number, y: number) {
    const room = rooms.find((room) => room.position_x === x && room.position_y === y)
    if (!room) {
      return 'var(--blue)'
    }
    return 'var(--red)'
  }

  // const bedroomId : any = rooms.map((room) => room.id)
  const bedroomId = roomSelected?.id



  function openModal(x, y) {
    
    setPos_x(x)
    setPos_y(y)

    //*verificar se existe o quarto na posicao x,y
    const room = rooms.find((room) => room.position_x === x && room.position_y === y)
    if (room) {
      setIsModalVisible(true)
      setRoomSelected(room)
    } else {
      /// position x e y == null
      const room =rooms.find((room) => room.position_x === null && room.position_y === null)
      if(room === undefined){
        Swal.fire('Não há quartos disponíveis', '', 'error')
        
      }else{
        setIsModalVisible(true)
        // room.position_x = x
        // room.position_y = y
        setRoomSelected(room)

      }
    }
  }



  return (
    <div>
     
      <ModalExterna>
        <Box sx={style}>
          <TituloCenter>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: 'var(--text)' }}>Mapa dos Quartos</Typography>
          </TituloCenter>
          <div>
            <CardsBedroom
              units={props.units}
              getRoomName={getRoomName}
              getRoomColor={getRoomColor}
              openModal={openModal}
            />
          </div>
          <Button sx={{ marginLeft: '20px' }} variant="contained" color="error" onClick={props.onClose}>Fechar</Button>
        </Box>
        {isModalVisible ? <ModalBedroom 
        onClose={() => setIsModalVisible(false)}  
        roomSelected={roomSelected}
        pos_x={pos_x}
        pos_y={pos_y}

        /> : null}
      </ModalExterna>
      
    </div>
  )
}


