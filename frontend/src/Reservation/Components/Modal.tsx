import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import {
  ModalCentral,
  InputNomeModal,
  ModalExterna,
} from '../../common/components/styled/styled'
import { Address } from '../../store/address.type'
import { Guest, setGuest } from '../../store/guestSlice'
import {
  Reservations,
  selectRegistrationData,
} from '../../store/reservationSlice'
import { selectTypeData } from '../../store/typeSlice'

type Props = {
  handleCep: (cep: string, setValue: any) => Promise<Address>
  onClose: () => void
  onSubmit: (data: Reservations, props: any) => Promise<Reservations>
  handleCpf: (cpf: string, setValue: any) => Promise<Guest>
}

export function ModalReservation(props: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const type = useSelector(selectTypeData)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Reservations>()
  
  const registration = useSelector(selectRegistrationData)

  useEffect(() => {
    if (registration) {
      setValue('guests.cpf', registration.guests.cpf)
      setValue('guests.name', registration.guests.name)
      setValue('guests.email', registration.guests.email)
      setValue('guests.phone', registration.guests.phone)
      setValue('guests.address.zipCode', registration.guests.address.zipCode)
      setValue('guests.address.street', registration.guests.address.street)
      setValue('guests.address.number', registration.guests.address.number)
      setValue('guests.address.complement', registration.guests.address.complement)
      setValue('guests.address.neighborhood', registration.guests.address.neighborhood)
      setValue('guests.address.city', registration.guests.address.city)
      setValue('guests.address.state', registration.guests.address.state)
    }else{
     dispatch(setGuest(undefined))
    }
  }, [])



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  }
  return (
    <div>
      <ModalExterna>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            color={'var(--text)'}
          >
            Reserva
          </Typography>
          <form onSubmit={handleSubmit(props.onSubmit)}>
            <InputNomeModal>
              <label>Nome: </label>
              <TextField
                {...register('guests.name')}
                size="small"
                id="name"
                variant="outlined"
              ></TextField>
            </InputNomeModal>
            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>CPF: </label>
                  <TextField
                    size="small"
                    id="cpf"
                    variant="outlined"
                    maxRows={11}
                    {...register('guests.cpf')}
                    onChange={(e) => props.handleCpf(e.target.value, setValue)}
                  />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>RG: </label>
                  <TextField
                    size="small"
                    id="rg"
                    variant="outlined"
                    {...register('guests.phone')}
                  />
                </InputNomeModal>
              </div>
            </ModalCentral>
            <ModalCentral>
            <InputNomeModal>
            <label>Tipo de Quarto: </label>
            <Select
                sx={{ height: '40px' }}
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
            </InputNomeModal>
            </ModalCentral>
            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>Email: </label>
                  <TextField
                    sx={{ width: '500px', color: 'var(--text)' }}
                    size="small"
                    id="email"
                    variant="outlined"
                    {...register('guests.email')}
                    value={registration?.guests.email}
                  />
                </InputNomeModal>
              </div>
            </ModalCentral>
            
            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>CEP: </label>
                  <TextField
                    size="small"
                    id="zipCode"
                    variant="outlined"
                    {...register('guests.address.zipCode')}
                    onChange={(e) => props.handleCep(e.target.value, setValue)}
                  />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>Rua: </label>
                  <TextField
                    sx={{ width: '500px', color: 'var(--text)' }}
                    size="small"
                    id="street"
                    variant="outlined"
                    {...register('guests.address.street')}
                  />
                </InputNomeModal>
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>Bairro: </label>
                  <TextField
                    sx={{ width: '360px' }}
                    size="small"
                    id="neighborhood"
                    variant="outlined"
                    {...register('guests.address.neighborhood')}
                  />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>Número: </label>
                  <TextField
                    size="small"
                    id="number"
                    variant="outlined"
                    {...register('guests.address.number')}
                  />
                </InputNomeModal>
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>Cidade: </label>
                  <TextField
                    sx={{ width: '460px' }}
                    size="small"
                    id="city"
                    type="text"
                    variant="outlined"
                    maxRows={11}
                    {...register('guests.address.city')}
                  />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>UF: </label>
                  <TextField
                    sx={{ width: '100px' }}
                    size="small"
                    id="state"
                    type="text"
                    variant="outlined"
                    maxRows={11}
                    {...register('guests.address.state')}
                  />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>Complemento: </label>
                  <TextField
                    size="small"
                    id="complement"
                    type="text"
                    variant="outlined"
                    maxRows={11}
                    {...register('guests.address.complement')}
                  />
                </InputNomeModal>
              </div>
          
            
            </ModalCentral>

            <Button
              sx={{ bgcolor: 'var(--text)', margin: '10px' }}
              variant="contained"
              type="submit"
            >
              Enviar
            </Button>
            <Button
              sx={{ margin: '10px' }}
              variant="contained"
              color="error"
              onClick={props.onClose}
            >
              Cancelar
            </Button>
          </form>
        </Box>
      </ModalExterna>
    </div>
  )
}
