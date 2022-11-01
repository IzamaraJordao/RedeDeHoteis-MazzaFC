import React, { useState } from 'react'
import { TituloCenter, ModalExterna } from './styled'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import { selectBedroomData } from "../../../store/bedroomSlice";
import CardsBedroom from "../CardsBedroom";
import { Button, Typography } from '@mui/material';
import ModalBedroom from "../ModalBedroom/Modal";



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

export default function ModalCards(props: any) {
  const rooms = useSelector(selectBedroomData)
  const [isModalVisible, setIsModalVisible] = useState(false);



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


  function openModal(x, y) {
    setIsModalVisible(true)

    //*verificar se existe o quarto na posicao x,y
    const room = rooms.find((room) => room.position_x === x && room.position_y === y)
    if (room) {

    } else {
      /// position x e y == null
    }

    //*se existir, abrir modal com os dados do quarto
    //*se nao existir, abrir modal para criar um novo quarto, passando informaçõe para a 
    //*primeira informação posicao x,y
    //na modal dar opção de excluir o quarto
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
        {isModalVisible ? <ModalBedroom onClose={() => setIsModalVisible(false)} /> : null}
      </ModalExterna>
    </div>
  )
}
