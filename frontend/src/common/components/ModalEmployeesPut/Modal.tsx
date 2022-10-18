import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ModalCentral, InputNomeModal, ModalExterna } from './styled'
import TextField from '@mui/material/TextField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useForm } from 'react-hook-form'

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

export type TypeEmployee = {
  name: string,
  rg: string,
  cpf: string,
  email: string,
  phone: string,
  password: string,
  address: {
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string
  },
  hotel_id: string,

}

export default function Modal(props : any) {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeEmployee>()


  async function getEmployeeBanco(id: string) {
    axios.get(`http://localhost:3030/employee/${id}`)
    .then((res) => {
      setValue('name', res.data.name)
      setValue('cpf', res.data.cpf)
      setValue('rg', res.data.rg)
      setValue('phone', res.data.phone)
      setValue('email',res.data.email)
      
    })
  } 

  useEffect(() => {
    getEmployeeBanco(props.idEmployee)
  },[ props.idEmployee])


  const onSubmit = (data: TypeEmployee) => {
    axios
      .put('http://localhost:3030/employee', {
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
          title: 'Funcionário Editado com sucesso!',
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
      title: 'Funcionário não cadastrado!',
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
            Cadastro de Funcionário
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
