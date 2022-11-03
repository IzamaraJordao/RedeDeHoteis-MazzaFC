import React, { useEffect} from "react";
import { Button, MenuItem, Select, Typography} from "@mui/material";
import { BoxDiv, BoxExternal, InputNomeModal, ModalInternaFloors, ModalBox } from './styled';
import { Hotel, selectData } from "../store/hotelSlice";
import { hotelPaginate } from "../api/hotel/api-hotel";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import ModalCards from "./components/ModalCards";
import { useForm } from "react-hook-form";
import { getBedroomFloors, getFloors} from "../api/bedroom/api-bedroomFloors";
import { selectBedroomData } from "../store/bedroomSlice";


export default function bancoTabela() {
  const hotels = useSelector(selectData)
  const bedrooms = useSelector(selectBedroomData)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const [numberOfRoom, setNumberOfRoom] = React.useState<string>() // andares
  const [hotel, setHotel] = React.useState<string>()
  const [floor, setFloor] = React.useState<string[]>([])
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false)
  const [units, setUnits] = React.useState<number>(0)

console.log(hotel)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<Hotel>()


  useEffect(() => {
    hotelPaginate(
      { page: 1, pageSize: 100, filter: {} },
      enqueueSnackbar,
      dispatch,
    )}, [])


  useEffect(() => {
    const response =  getFloors(hotel as string, enqueueSnackbar, dispatch).then((res) => {
      setFloor(res)
    })
  }, [hotel])


 
async function mapBedroom() {
  await getBedroomFloors(hotel as string, numberOfRoom as string, enqueueSnackbar, dispatch).
  then((res) => {
    console.log("Rooms Selected ", ...res.map((item) => item.name))
    setUnits(res.length)
   
  })
  setIsModalVisible(true)
}


  return (
    <div>
      <div>

        <BoxExternal>
          <BoxDiv>

            <div>
              <InputNomeModal>
               <Typography variant="h5" component="div" gutterBottom sx={{color: 'var(--text)'}}>Hotel</Typography>
                <Select
                  sx={{ width: '200px', display: 'flex', justifyContent: 'center' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="hotel"
                  value={hotel}
                  onChange={(e)=> setHotel(e.target.value)}
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
                <Typography variant="h5" component="div" gutterBottom>Andar</Typography>
                <Select
                  sx={{ width: '200px', display: 'flex', justifyContent: 'center' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="hotel"
                  
                  onChange={(e) => setNumberOfRoom(String(e.target.value))}
                >
                  <MenuItem value="" selected sx={{ width: '250px' }}>
                    Selecione...
                  </MenuItem>
                  {floor.map((floors) => (
                    <MenuItem value={floors}>{floors}</MenuItem>
                  ))}
                </Select>
              </InputNomeModal>
            </div>
            <div>
              <Button variant="contained" onClick={mapBedroom}>Mapa de Quartos</Button>
            </div>
          </BoxDiv>
        </BoxExternal>

      </div>
      {isModalVisible ? 
      <ModalCards
        units={units}
        onClose={() => setIsModalVisible(false)} 
        hotelId={hotel as string}
        // numberOfRoom={numberOfRoom as string}
        />
        : null}
    </div>
  )
}


