import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ModalCentral, InputNomeModal, ModalExterna } from './styled'
import TextField from '@mui/material/TextField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { guestById } from '../../../api/guest/api-guest'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export type TypeGuest = {
  name: string
  cpf: string
  rg: string
  email: string
  phone: string
  address: string
}

export default function Modal(props : any) {
  const [age, setAge] = React.useState('')
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeGuest>()



  async function getGuestBanco(id: string) {
    guestById(id, enqueueSnackbar, dispatch)
    .then((res) => {
      console.log(res)
      setValue('name', res.name)
      setValue('cpf', res.cpf)
      setValue('rg', res.rg)
      setValue('phone', res.phone)
      setValue('email',res.email)
    })
  } 

  useEffect(() => {
    getGuestBanco(props.idGuest)
  },[ props.idGuest ])


  const onSubmit = (data: TypeGuest) => {
    axios
      .put('http://localhost:3030/guest', {
        name: data.name,
        rg: data.rg,
        cpf: data.cpf,
        email: data.email,
        phone: data.phone,
        address: data.address,
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Hóspede cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        })
      })
    props.onClose()
  }


  function close() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Hóspede não cadastrado!',
      showConfirmButton: false,
      timer: 1500,
    })
    props.onClose()
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
            Cadastro de Hóspede
          </Typography>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputNomeModal>
              <label style={{ marginLeft: '10px', color: 'var(--text)' }}>
                Nome
              </label>
              <TextField
                size="small"
                id="name"
                sx={{ width: '687px' }}
                {...register('name')}
              />
            </InputNomeModal>

            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>CPF</label>
                  <TextField
                    size="small"
                    id="cpf"
                    variant="outlined"
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
                    sx={{ width: '695px', color: 'var(--text)' }}
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
                  <label>Endereço</label>
                  <TextField
                    sx={{ width: '695px', color: 'var(--text)' }}
                    size="small"
                    id="address"
                    variant="outlined"
                    {...register('address')}
                  />
                </InputNomeModal>
              </div>
            </ModalCentral>

            <Button
              sx={{ bgcolor: 'var(--text)' }}
              variant="contained"
              type="submit"
            >
              Enviar
            </Button>
            <Button
              sx={{ marginLeft: '10px' }}
              variant="contained"
              color="error"
              onClick={close}
            >
              Cancelar
            </Button>
          </form>
        </div>
      </Box>
    </ModalExterna>
  )
}
