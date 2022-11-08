import React, { useEffect, useState } from 'react'
import {
  reservationCreate,
  reservationDelete,
  reservationPaginate,
  reservationUpdate,
} from '../api/reservations/Api-reservations'
import {typePaginate} from '../api/type/api-type'
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

import { useForm } from 'react-hook-form'
import { selectType, selectTypeData } from '../store/typeSlice'
import { Dispatch, AnyAction } from 'redux'
import { selectData } from '../store/employeeSlice'
import axios from 'axios'
import { ModalReservation } from './Components/Modal'
import { If } from '../common/components/If'


export default function bancoTabela() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const type = useSelector(selectTypeData)
  const pagination = useSelector(selectPaginate)
  const [isVisibled, setIsVisibled] = useState(false)
  const [idReservation, setIdReservation] = useState<string | undefined>(
    undefined,
  )
  
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
  function handleCep(cep: string, setValue: any): any {
    if (cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
        setValue('address.street', response.data.logradouro)
        setValue('address.neighborhood', response.data.bairro)
        setValue('address.city', response.data.localidade)
        setValue('address.state', response.data.uf)
      })
    }
  }

  //trazer as informações de guest pelo cpf e preencher os campos
  function handleCpf(cpf: string, setValue: any): any {
    if (cpf.length === 11) {
      axios.get(`http://localhost:3030/guest?`).then((response) => {
        setValue('guest.name', response.data.name)
        setValue('guest.cpf', response.data.cpf)
        setValue('guest.email', response.data.email)
        setValue('guest.phone', response.data.phone)
        setValue('guest.address.street', response.data.address.street)
        setValue('guest.address.neighborhood',response.data.address.neighborhood)
        setValue('guest.address.city', response.data.address.city)
        setValue('guest.address.state', response.data.address.state)
        setValue('guest.address.zipCode', response.data.address.zipCode)
      })
    }
  }
const onSubmit = (data: Reservations): any => {
    if (idReservation) {
      handleUpdate(data)
    } else {
      handleCreate(data)
    }
    handleClose()
  }

  function handleClose(){
    setIsModalVisible(false)
    setIdReservation(undefined)
    dispatch(setReservations(undefined))
    reservationPaginate(pagination, enqueueSnackbar, dispatch)
  }

  
  function handleChange(e) {
    setValue('room_type_id', e.target.value)
  }

  useEffect(() => {
    typePaginate(
      { page: 1, pageSize: 100, filter: {} },
      enqueueSnackbar,
      dispatch,
    )
  }, [])

  console.log(type)
  return (
    <div>
      <BoxExternal>
        <BoxDiv>
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Check-In</label>
              <input type="date" {...register('check_in')} />
              <label>Check-Out</label>
              <input type="date" {...register('check_out')} />
              <label>Tipo de Quarto</label>
              <Select
                sx={{ height: '30px' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="room_type"
                defaultValue={6}
                {...register('room_type_id')}
                
              >
                {type.map((room_type) => (
                  <MenuItem value={room_type.id} sx={{ width: '250px' }}>
                    {room_type.name}
                  </MenuItem>
                ))}

                
              </Select>
            
              <Button variant="contained" onClick={() => {setIsVisibled(true)}}>
                Buscar Quartos
              </Button>
            </form>
          </div>
        </BoxDiv>
      </BoxExternal>

      {isVisibled &&
      <ModalReservation
      handleCep= {handleCep}
      handleCpf= {handleCpf}
      onClose={handleClose}
      onSubmit={onSubmit}
      />
      }
          
    </div>
  )
}

