import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ModalCentral, InputNomeModal, ModalExterna } from './styled'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { MenuItem, Select } from '@mui/material'
import { style } from './typesAndStyles'
import { employeePaginate } from '../../../api/employee/api-employee'
import { Employee } from '../../../store/employeeSlice'
import { MyContext } from '../../Employees'
import { useSelector } from 'react-redux'
import { selectData } from '../../../store/hotelSlice'
import Swal from 'sweetalert2'

export default function ModalEmployee({ onClose, open, idEmployee }: any) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>()
  const hotels = useSelector(selectData)
  const {
    pagination,
    enqueueSnackbar,
    handleCreate,
    dispatch,
    onSubmit,
    handleChange,
    handleCep,
    setIsModalVisible,
    setIsVisibled,
    isVisibled,
  } = MyContext()

  useEffect(() => {
    employeePaginate(pagination, enqueueSnackbar, dispatch)
  }, [])
  
  function close() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Funcionário não cadastrado!',
      showConfirmButton: false,
      timer: 1500,
    })
    onClose()
  }

  return (
    <div>
      <ModalExterna>
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              color={'var(--text)'}
            >
              {idEmployee !== null ? 'Novo Funcionário' : 'Editar Funcionário'}
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
                  sx={{ width: '757px' }}
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
                      sx={{ width: '500px', color: 'var(--text)' }}
                      size="small"
                      id="email"
                      variant="outlined"
                      {...register('email')}
                    />
                  </InputNomeModal>
                </div>
                <div>
                  <InputNomeModal>
                    <label>Senha</label>
                    <TextField
                      size="small"
                      type="number"
                      variant="outlined"
                      maxRows={11}
                      {...register('password')}
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
                      onChange={(e) => handleCep(e.target.value)}
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
                <div>
                  <InputNomeModal>
                    <label>Hotel</label>
                    <Select
                      sx={{ width: '200px' }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="hotel"
                      {...register('hotel_id')}
                      onChange={handleChange}
                    >
                      <MenuItem value="" selected sx={{ width: '250px' }}>
                        Selecione...
                      </MenuItem>
                      {hotels.map((hotel) => (
                        <MenuItem value={hotel.id}>{hotel.name}</MenuItem>
                      ))}
                    </Select>
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
                sx={{ bgcolor: 'var(--text)' }}
                variant="contained"
                type="submit"
              >
                Enviar
              </Button>
              <Button variant="contained" color="error" onClick={close}>
                Cancelar
              </Button>
            </form>
          </div>
        </Box>
      </ModalExterna>
    </div>
  )
}
