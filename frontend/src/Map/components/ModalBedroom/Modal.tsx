import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ModalCentral, InputNomeModal, ModalExterna } from './styled'
import TextField from '@mui/material/TextField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { MenuItem, Select } from '@mui/material'
import { Bedroom } from '../../../store/bedroomSlice'
import { useSelector } from 'react-redux'
import { selectData as selectBedroomData } from "../../../store/bedroomSlice";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}


export default function ModalBedroom({ onClose }) {

  const rooms = useSelector(selectBedroomData)
  const [age, setAge] = React.useState('')
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Bedroom>()

  function handleChange(e) {
    // setValue('floor_hotel', e.target.value)
    setValue('name', e.target.value)
  }


  return (
    <ModalExterna>
      <Box sx={style}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            color={'var(--text)'}
          >
            Cadastro de Quarto
          </Typography>
        </div>
        <InputNomeModal>
          <label>Nome do quarto</label>
        <TextField id="outlined-basic"  variant="outlined" />
        </InputNomeModal>

        <div>
              <InputNomeModal>
                <label>Estilo de quarto</label>
                <Select
                  sx={{ width: '200px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="hotel"
                  {...register('status_room_id')}
                  onChange={handleChange}
                >
                  <MenuItem value="" selected sx={{ width: '250px' }}>
                    Selecione...
                  </MenuItem>
                  {rooms.map((hotel) => (
                    <MenuItem value={hotel.id}>{hotel.status_room_id}</MenuItem>
                  ))}
                </Select>
              </InputNomeModal>
            </div>
            <div>
              <InputNomeModal>
                <label>Tipo de Quarto</label>
                <Select
                  sx={{ width: '200px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="hotel"
                  {...register('room_type_id')}
                  
                >
                  <MenuItem value="" selected sx={{ width: '250px' }}>
                    Selecione...
                  </MenuItem>
                  {rooms.map((hotel) => (
                    <MenuItem value={hotel.room_type_id}>{hotel.room_type_id}</MenuItem>
                  ))}
                </Select>
              </InputNomeModal>
            </div>

        <div>
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </Box>
    </ModalExterna>
  )
}
