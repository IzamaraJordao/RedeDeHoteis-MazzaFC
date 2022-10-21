import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ModalCentral, InputNomeModal, ModalExterna } from './styled'
import TextField from '@mui/material/TextField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import {employeeById, employeePut} from '../../../api/employee/api-employee'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Employee } from '../../../store/employeeSlice'

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



export default function ModalEmployeePut(props : any) {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>()


  async function getEmployeeBanco(id: string) {
    employeeById(id, enqueueSnackbar, dispatch)
    .then((res) => {
      console.log(res)
      setValue('name', res.name)
      setValue('cpf', res.cpf)
      setValue('rg', res.rg)
      setValue('phone', res.phone)
      setValue('email',res.email)
      register('address.id')
      setValue('address.id', res.address.id)
    })

  } 

  useEffect(() => {
    getEmployeeBanco(props.idEmployee)
  },[ props.idEmployee])


  const onSubmit = (data: Employee) => {
    employeePut(props.idEmployee, {
      id: props.idEmployee,
      name: data.name,
      rg: data.rg,
      cpf: data.cpf,
      email: data.email,
      phone: data.phone,
      password: data.password,
     note: data.note,
     active: data.active,
     is_first_access: data.is_first_access,
     hotel_id: data.hotel_id,
     address: {id: data.address.id},
     
    }, enqueueSnackbar, dispatch)
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
