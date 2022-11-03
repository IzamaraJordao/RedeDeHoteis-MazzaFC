import { Box, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { ModalExterna } from '../../common/components/styled/styled'
import { Address } from '../../store/address.type'
import { Guest } from '../../store/guestSlice'
import { Reservations } from '../../store/reservationSlice'

type Props = {
  handleCep: (cep: string, setValue: any) => Promise<Address>
  onClose: () => void
  open: boolean
  idReservation: string | undefined
  getReservation: (id: string, setValue: any) => Promise<void>
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

  return (
    <div>
      <ModalExterna>
        <Box>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5" component="h2" style={{ color: '#fff' }}>
              {' '}
              Reserva{' '}
            </Typography>
          </div>
          <div>
            <form onSubmit={handleSubmit(props.onSubmit)}>
              <div>
                <label>CPF</label>
                <input
                  type="text"
                  {...register('guests')}
                  onChange={(e) => {
                    props.handleCpf(e.target.value, setValue)
                  }}
                />
              </div>
            </form>
          </div>
        </Box>
      </ModalExterna>
    </div>
  )
}
