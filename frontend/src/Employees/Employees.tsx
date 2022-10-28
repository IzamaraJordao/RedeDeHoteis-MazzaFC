import React, { useEffect, useState } from 'react'
import { BoxDiv, BoxExternal } from './styled'
import Button from '@mui/material/Button'
import { TableEmployee } from './components/TableEmployee/ColumnEmployee'
import ModalEmployee from './components/ModalEmployees/Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { MenuItem, Select } from '@mui/material'

import { hotelPaginate } from '../api/hotel/api-hotel'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import {
  employeeById,
  employeeCreate,
  employeeDelete,
  employeePaginate,
  employeePut,
} from '../api/employee/api-employee'
import {
  Employee,
  selectEmployee,
  selectIsFormLoading,
  selectIsLoading,
  selectPaginate,
  setEmployee 
} from '../store/employeeSlice'
import { Pagination } from '../template/types/pagination'
import { If } from '../common/components'

export function EmployeePage() {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const [isVisibled, setIsVisibled] = useState(false)
  const [idEmployee, setIdEmployee] = useState<string | undefined>(undefined)
  const pagination = useSelector(selectPaginate)


  function handleDelete(id: string) {
    Swal.fire({
      title: 'Deseja realmente excluir?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      denyButtonText: `Não Remover`,
    }).then((result) => {
      if (result.isConfirmed) {
        employeeDelete(id, enqueueSnackbar, dispatch).then(() => {
          employeePaginate(pagination, enqueueSnackbar, dispatch)
        })
        Swal.fire('Funcionário excluido', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  async function getEmployeeBanco(id: string, setValue: any) {
    employeeById(id, enqueueSnackbar, dispatch).then((res) => {
      setValue('name', res.name)
      setValue('cpf', res.cpf)
      setValue('rg', res.rg)
      setValue('phone', res.phone)
      setValue('email', res.email)
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
  const handleUpdate = (data: Employee) => {
    employeePut(idEmployee as string, data, enqueueSnackbar, dispatch)
    
    }
  
  useEffect(() => {
    hotelPaginate(
      { page: 1, pageSize: 100, filter: {} },
      enqueueSnackbar,
      dispatch,
    )
  }, [])

  const onSubmit = (data: Employee): any => {
    if (idEmployee) {
      handleUpdate(data)
    } else {
      handleCreate(data)
    }
    handleClose()
  }

  const handleCreate = (data: Employee) => {
    employeeCreate(data, enqueueSnackbar, dispatch).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Funcionário cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  function handleClose (){
    setIsVisibled(false)
    setIdEmployee(undefined)
    dispatch(setEmployee(undefined))
    employeePaginate(pagination, enqueueSnackbar, dispatch)
  }

  function handleCep(cep: string, setValue: any): any {
    if (cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
        setValue('address.street', response.data.logradouro)
        setValue('address.neighborhood', response.data.bairro)
        setValue('address.city', response.data.localidade)
        setValue('address.state', response.data.uf)
      })
    }
  }
  useEffect(() => {
    employeePaginate(pagination, enqueueSnackbar, dispatch)
  }, [])

  return (
    <>
      <BoxExternal>
        <BoxDiv>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                setIsVisibled(true)
              }}
            >
              NOVO CADASTRO
            </Button>
          </div>
          <TableEmployee
            setIdModal={setIdEmployee}
            employeePaginate={(pagination: Pagination<Employee>) =>
              employeePaginate(pagination, enqueueSnackbar, dispatch)
            }
            handleDelete={handleDelete}
            setIsModalVisible={setIsVisibled}
            
          />
        </BoxDiv>
      </BoxExternal>
      <If condition={isVisibled}>
        <ModalEmployee
          getEmployee={getEmployeeBanco}
          onClose={handleClose}
          idEmployee={idEmployee}
          open={false}
          onSubmit={onSubmit}
          handleCep={handleCep}
        />
      </If>
    </>
  )
}
