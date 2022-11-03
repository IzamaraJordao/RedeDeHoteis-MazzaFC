import React, { useEffect, useState } from 'react'
import {
  reservationCreate,
  reservationDelete,
  reservationPaginate,
  reservationUpdate,
} from '../api/reservations/Api-reservations'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import { BoxDiv, BoxExternal } from './styled'
import {
  Reservations,
  selectPaginate,
  setReservations,
} from '../store/reservationSlice'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'
import { selectData } from '../store/bedroomSlice'
import { useForm } from 'react-hook-form'

export default function bancoTabela() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const bedrooms = useSelector(selectData)

  const pagination = useSelector(selectPaginate)
  const [isVisibled, setIsVisibled] = useState(false)
  const [idReservation, setIdReservation] = useState<string | undefined>(undefined)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Reservations>()

  const handleCreate = (data: Reservations) => {
    reservationCreate(data, enqueueSnackbar, dispatch)
  }
  const handleUpdate = (data: Reservations) => {
    reservationUpdate(data, enqueueSnackbar, dispatch)
  }

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Deseja realmente excluir?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      denyButtonText: `Não Remover`,
    }).then((result) => {
      if (result.isConfirmed) {
        reservationDelete(id, enqueueSnackbar, dispatch).then(() => {
          reservationPaginate(pagination, enqueueSnackbar, dispatch)
        })
        Swal.fire('Reserva excluida', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  
  function handleChange(e) {
    setValue('bedroom_id', e.target.value)
  }

  return (
    <div>
      <BoxExternal>
        <BoxDiv>
          <div className="container">
        <form>
          <label>Check-In</label>
          <input type="date"/>
          <label>Check-Out</label>
          <input type="date"/>
          <label>Quarto</label>
          <Select
                      sx={{ width: '200px' }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="bedroom"
                      {...register('bedroom_id')}
                      onChange={handleChange}
                    >
                      <MenuItem value="" selected sx={{ width: '200px' }}>
                        Selecione...
                      </MenuItem>
                      {bedrooms.map((bedroom) => (
                        <MenuItem value={bedroom.id}>{bedroom.name}</MenuItem>
                      ))}
                    </Select>
          <Button variant="contained"  onClick={() => {handleCreate}}>Reservar</Button>
        </form>            

          </div>
        </BoxDiv>
      </BoxExternal>
    </div>
  )
}
