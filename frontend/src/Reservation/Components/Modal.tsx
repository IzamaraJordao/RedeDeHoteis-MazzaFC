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
import { useDispatch } from 'react-redux'
import {
  ModalCentral,
  InputNomeModal,
  ModalExterna,
} from '../../common/components/styled/styled'
import { Address } from '../../store/address.type'
import { Guest } from '../../store/guestSlice'
import { Reservations } from '../../store/reservationSlice'

type Props = {
  handleCep: (cep: string, setValue: any) => Promise<Address>
  onClose: () => void
  onSubmit: (data: Reservations, props: any) => Promise<Reservations>
  handleCpf: (cpf: string, setValue: any) => Promise<Guest>
}

export function ModalReservation(props: Props) {
  const dispatch = useDispatch()
  const enqueueSnackbar = useSnackbar()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Reservations>()

  function handleChange(e) {
    setValue('guests', e.target.value)
  }
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
          <form onSubmit={handleSubmit((data) => props.onSubmit(data, props))}>
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
                  <label>CPF</label>
                  <TextField
                    size="small"
                    id="cpf"
                    type="number"
                    variant="outlined"
                    maxRows={11}
                    {...register('cpf')}
                  />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>RG</label>
                  <TextField
                    size="small"
                    id="rg"
                    type="text"
                    variant="outlined"
                    maxRows={11}
                    {...register('rg')}
                  />
                </InputNomeModal>
              </div>

              <div>
                <InputNomeModal>
                  <label>Telefone</label>
                  <TextField
                    size="small"
                    id="phone"
                    type="number"
                    variant="outlined"
                    {...register('phone')}
                  />
                </InputNomeModal>
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>Email</label>
                  <TextField
                    sx={{ width: '500px', color: 'var(--text)' }}
                    size="small"
                    id="email"
                    variant="outlined"
                    {...register('email')}
                  />
                </InputNomeModal>
              </div>
            </ModalCentral>

            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>CEP</label>
                  <TextField
                    size="small"
                    variant="outlined"
                    {...register('address.zipCode')}
                    onChange={(e) => props.handleCep(e.target.value, setValue)}
                  />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>Rua</label>
                  <TextField
                    sx={{ width: '500px', color: 'var(--text)' }}
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    {...register('address.street')}
                  />
                </InputNomeModal>
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>Bairro</label>
                  <TextField
                    sx={{ width: '360px' }}
                    size="small"
                    variant="outlined"
                    {...register('address.neighborhood')}
                  />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>Número</label>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    {...register('address.number')}
                  />
                </InputNomeModal>
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>Cidade</label>
                  <TextField
                    sx={{ width: '460px' }}
                    size="small"
                    id="cpf"
                    type="text"
                    variant="outlined"
                    maxRows={11}
                    {...register('address.city')}
                  />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>UF</label>
                  <TextField
                    sx={{ width: '100px' }}
                    size="small"
                    id="cpf"
                    type="text"
                    variant="outlined"
                    maxRows={11}
                    {...register('address.state')}
                  />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>Complemento</label>
                  <TextField
                    size="small"
                    id="cpf"
                    type="text"
                    variant="outlined"
                    maxRows={11}
                    {...register('address.complement')}
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
