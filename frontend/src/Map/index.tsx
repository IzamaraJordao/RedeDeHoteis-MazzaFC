import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { BoxDiv, BoxExternal, InputNomeModal, ModalInternaFloors, ModalExterna, ModalInterna } from './styled';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Hotel, selectData } from "../store/hotelSlice";
import { selectData as selectBedroomData } from "../store/bedroomSlice";
import { useForm } from "react-hook-form";
import { hotelPaginate } from "../api/hotel/api-hotel";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { range } from "ramda";
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function bancoTabela() {
  const hotels = useSelector(selectData)
  const rooms = useSelector(selectBedroomData)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numberOfRoom, setNumberOfRoom] = React.useState<number>(0)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Hotel>()


  useEffect(() => {
    hotelPaginate(
      { page: 1, pageSize: 100, filter: {} },
      enqueueSnackbar,
      dispatch,
    )
  }, [])

  const onSubmit = (data: Hotel) => {
  }


  function handleChange(e) {
    // setValue('floor_hotel', e.target.value)
    setValue('name', e.target.value)
    const setFloor: any = setValue('floor_hotel', e.target.value)
  }

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
    //*se existir, abrir modal com os dados do quarto
    //*se nao existir, abrir modal para criar um novo quarto, passando informaçõe para a 
    //*primeira informação posicao x,y
    //na modal dar opção de excluir o quarto
  }


  function formFloorRooms() {

    const floors = range(0, numberOfRoom + 2)
    return (
      <div>

        {floors.map((floor, x) => (
          <ModalInternaFloors key={floor}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {floors.map((_, y) => (
                  <Grid item xs={2} sm={3} md={3} key={y}>
                    <Box
                      sx={{
                        borderRadius:2,
                        width: 150,
                        height: 70,
                        backgroundColor: getRoomColor(x, y),
                        color: '#fff',
                        boxShadow: '5px 5px 16px 3px rgba(0,0,0,0.2)'
                      }}
                      onClick={()=> openModal(x,y)}
                    >{getRoomName(x, y)}</Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </ModalInternaFloors>
        ))}
      </div>
    )
  }


  return (
    <div>
      <div>

        <BoxExternal>
          <BoxDiv>

            <div>
              <InputNomeModal>
                <label>Hotel</label>
                <Select
                  sx={{ width: '200px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="hotel"
                  {...register('id')}
                  onChange={handleChange}
                >
                  <MenuItem value="" selected sx={{ width: '250px' }}>
                    Selecione...
                  </MenuItem>
                  {hotels.map((hotel) => (
                    <MenuItem value={hotel.id}>{hotel.name}</MenuItem>
                  ))}
                </Select>
              </InputNomeModal>
            </div>
            <div>
              <InputNomeModal>
                <label>Andar</label>
                <Select
                  sx={{ width: '200px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="hotel"
                  {...register('floor_hotel')}
                  onChange={(e) => setNumberOfRoom(Number(e.target.value))}
                >
                  <MenuItem value="" selected sx={{ width: '250px' }}>
                    Selecione...
                  </MenuItem>
                  {hotels.map((hotel) => (
                    <MenuItem value={hotel.floor_hotel}>{hotel.floor_hotel}</MenuItem>
                  ))}
                </Select>
              </InputNomeModal>
            </div>
            {numberOfRoom > 0 && formFloorRooms()}
          </BoxDiv>
        </BoxExternal>

      </div>
      {/* {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)} /> : null} */}
    </div>
  )
}


