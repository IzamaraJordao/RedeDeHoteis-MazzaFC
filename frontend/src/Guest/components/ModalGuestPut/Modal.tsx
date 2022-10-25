import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ModalCentral, InputNomeModal, ModalExterna } from './styled'
import TextField from '@mui/material/TextField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { guestById, guestPut } from '../../../api/guest/api-guest'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Address } from '../../../store/address.type'

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
  address: Address
}

export default function Modal(props : any) {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeGuest>()



  async function getGuestBanco(id: string) { // Busca o convidado no banco de dados
    guestById(id, enqueueSnackbar, dispatch)
    .then((res) => {
      console.log(res)
      setValue('name', res.name)
      setValue('cpf', res.cpf)
      setValue('rg', res.rg)
      setValue('phone', res.phone)
      setValue('email',res.email)
      setValue('address.id', res.address.id)
      setValue('address.street', res.address.street)
      setValue('address.number', res.address.number)
      setValue('address.complement', res.address.complement)
      setValue('address.neighborhood', res.address.neighborhood)
      setValue('address.city', res.address.city)
      setValue('address.state', res.address.state)
      setValue('address.zipCode', res.address.zipCode)

    })
  } 

  useEffect(() => {
    getGuestBanco(props.idGuest)
  },[ props.idGuest ])


  const onSubmit = (data: TypeGuest) => { // salvar no banco
    guestPut(props.idGuest, {
        name: data.name,
        rg: data.rg,
        cpf: data.cpf,
        email: data.email,
        phone: data.phone,
        address: {
          id: data.address.id,
          street: data.address.street,
          number: data.address.number,
          complement: data.address.complement,
          neighborhood: data.address.neighborhood,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
        },
      } , enqueueSnackbar, dispatch)
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
              <div style={{display: 'none'}}>
                <InputNomeModal>
                  <label>Endereço</label>
                  <TextField
                    sx={{ width: '695px', color: 'var(--text)' }}
                    size="small"
                    id="address"
                    variant="outlined"
                    {...register('address.id')}

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
