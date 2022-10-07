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
  address: {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  hotel_id: string
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
    const data = await guestById(id, enqueueSnackbar, dispatch)
      setValue('name', data.name)
      setValue('cpf', data.cpf)
      setValue('rg', data.rg)
      setValue('phone', data.phone)
      setValue('email',data.email)
  
  } 

  useEffect(() => {
    getGuestBanco(props.id)
  },[ props.id ])


  const onSubmit = (data: TypeGuest) => {
    axios
      .put('http://localhost:3030/guest', {
        name: data.name,
        rg: data.rg,
        cpf: data.cpf,
        email: data.email,
        phone: data.phone,
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
                    sx={{ width: '695px', color: 'var(--text)' }}
                    size="small"
                    id="email"
                    variant="outlined"
                    {...register('email')}
                  />
                </InputNomeModal>
              </div>
            </ModalCentral>

            {/* <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>CEP</label>
                  <TextField
                    size="small"
                    variant="outlined"
                    {...register('address.zipCode')}
                    
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
                    sx={{ width: '560px' }}
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
                    sx={{ width: '360px' }}
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
            </ModalCentral> */}

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
