import {
  reservationCreate,
  reservationDelete,
  reservationGetByCPF,
  reservationPaginate,
  reservationUpdate,
} from '../api/reservations/Api-reservations'
import { typePaginate } from '../api/type/api-type'
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
import { bedroomGet } from '../api/bedroom/api-bedroomFloors'
import { Bedroom } from '../store/bedroomSlice'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'
import React, { useEffect, useState } from 'react'
import ptBR from 'date-fns/locale/pt-BR'

export default function bancoTabela() {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
 
  const pagination = useSelector(selectPaginate)
  const [isVisibled, setIsVisibled] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
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
      reservationGetByCPF(cpf, enqueueSnackbar, dispatch).then((response) => {
        setValue('guest.name', response.data.name)
        setValue('guest.cpf', response.data.cpf)
        setValue('guest.rg', response.data.rg)
        setValue('guest.email', response.data.email)
        setValue('guest.phone', response.data.phone)
        setValue('guest.address.street', response.data.address.street)
        setValue('guest.address.number', response.data.address.number)
        setValue(
          'guest.address.neighborhood',
          response.data.address.neighborhood,
        )
        setValue('guest.address.complement', response.data.address.complement)
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

  function handleClose() {
    setIsVisibled(false)
    setIdReservation(undefined)
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

  // useEffect(() => {
  //   reservationPaginate(pagination, enqueueSnackbar, dispatch)
  // }, [pagination])
  // setar valor e trocar valor de variavel data
  

  

  return (
    <div>
      <BoxExternal>
        <BoxDiv>
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Check-In</label>
              <DateTimePicker
                {...register('check_in')}
                onChange={(date: Date) => setValue( 'check_in', date)}
              />

              <label>Check-Out</label>
              <DateTimePicker
                selected={startDate}
                className="form-field"
                dateFormat="dd/MM/yyyy"
                {...register('check_out')}
                onChange={(date: Date) => setStartDate(date)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  setIsVisibled(true)
                }}
              >
                Buscar Quartos
              </Button>
            </form>
          </div>
        </BoxDiv>
      </BoxExternal>

      {isVisibled && (
        <ModalReservation
          handleCep={handleCep}
          onClose={handleClose}
          handleCpf={handleCpf}
          onSubmit={onSubmit}
        />
      )}
    </div>
  )
}
