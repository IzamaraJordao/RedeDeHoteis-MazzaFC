import React, { useEffect} from "react";
import { MenuItem, Select} from "@mui/material";
import { BoxDiv, BoxExternal, InputNomeModal, ModalInternaFloors, ModalBox } from './styled';
import { Hotel, selectData } from "../store/hotelSlice";
import { hotelPaginate } from "../api/hotel/api-hotel";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import ModalCards from "./components/ModalCards";
import { useForm } from "react-hook-form";


export default function bancoTabela() {
  const hotels = useSelector(selectData)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

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
    setValue('name', e.target.value)
    
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
                  sx={{ width: '200px', display: 'flex', justifyContent: 'center' }}
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
                  sx={{ width: '200px', display: 'flex', justifyContent: 'center' }}
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
          </BoxDiv>
        </BoxExternal>

      </div>
      {numberOfRoom ? <ModalCards
        numberOfRoom={numberOfRoom}
        onClose={() => setNumberOfRoom(0)} />
        : null}
    </div>
  )
}


