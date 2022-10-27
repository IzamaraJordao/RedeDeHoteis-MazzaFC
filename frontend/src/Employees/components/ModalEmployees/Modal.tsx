import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ModalCentral, InputNomeModal, ModalExterna } from './styled'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { MenuItem, Select } from '@mui/material'
import { style } from './typesAndStyles'
import {
  Employee,
  selectEmployeeData,
  setEmployee,
} from '../../../store/employeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectData } from '../../../store/hotelSlice'
import { Address } from '../../../store/address.type'

type Props = {
  onClose: () => void
  open: boolean
  idEmployee: string | undefined
  getEmployee: (id: string, setValue: any) => Promise<void>
  onSubmit: (data: Employee, props: any) => Promise<any>
  handleCep: (cep: string, setValue: any) => Promise<Address>
}

export default function ModalEmployee(props: Props) {
  const dispatch = useDispatch()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>()
  const hotels = useSelector(selectData)
  const employee = useSelector(selectEmployeeData)

  const dataEmployee = async (id: Required<Employee['id']>) => {
    return await props.getEmployee(id as string, setValue)
  }
  useEffect(() => {
    if (props.idEmployee) {
      dataEmployee(props.idEmployee)
      if (employee) {
        setValue('name', employee.name)
        setValue('rg', employee.rg)
        setValue('cpf', employee.cpf)
        setValue('email', employee.email)
        setValue('phone', employee.phone)
        setValue('password', employee.password)
        setValue('address.street', employee.address.street)
        setValue('address.number', employee.address.number)
        setValue('address.complement', employee.address.complement)
        setValue('address.neighborhood', employee.address.neighborhood)
        setValue('address.city', employee.address.city)
        setValue('address.state', employee.address.state)
        setValue('address.zipCode', employee.address.zipCode)
        setValue('hotel_id', employee.hotel_id)
      }
    } else {
      dispatch(setEmployee(undefined))
    }
  }, [])

  function handleChange(e) {
    setValue('hotel_id', e.target.value)
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
              {props.idEmployee === undefined
                ? 'Novo Funcionário'
                : 'Editar Funcionário'}
            </Typography>
          </div>
          <div>
            <form onSubmit={handleSubmit(props.onSubmit)}>
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
                      onChange={(e) =>
                        props.handleCep(e.target.value, setValue)
                      }
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
          </div>
        </Box>
      </ModalExterna>
    </div>
  )
}
