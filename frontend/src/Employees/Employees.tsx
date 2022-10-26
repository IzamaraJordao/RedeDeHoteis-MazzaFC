import React, { useEffect, useState } from 'react'
import { BoxDiv, BoxExternal } from './styled'
import Button from '@mui/material/Button'
import TableMain from './components/TableEmployee/ColumnEmployee'
import ModalEmployee from './components/ModalEmployees/Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { MenuItem, Select } from '@mui/material'
import { selectData } from '../store/EmployeeSlice'
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
} from '../store/employeeSlice'
import { createContext } from 'react'

export interface BancoEmployee {
  id: number
  nome: string
  rg: string
  cpf: string
  email: string
  phone: string
}

interface Props {
  idEmployee: string
}

export const context = createContext({})
export function MyContext() {
  const [isVisibled, setIsVisibled] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisiblePut, setIsModalVisiblePut] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const pagination = useSelector(selectPaginate)
  const data = useSelector(selectData)
  const employee = useSelector(selectEmployee)
  const isLoading = useSelector(selectIsLoading)
  const isFormLoading = useSelector(selectIsFormLoading)
  const [idModal, setIdModal] = useState<string | undefined>(undefined)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>()

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

  function ModalPutEmployee(id: string, data: Employee) {
    Swal.fire({
      title: 'Deseja realmente editar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: `Não Editar`,
    }).then((result) => {
      if (result.isConfirmed) {
        employeePut(id, data, enqueueSnackbar, dispatch).then(() => {
          employeePaginate(pagination, enqueueSnackbar, dispatch)
        })
        Swal.fire('Funcionário editado', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  function getEmployeeBanco(id: string) {
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
  const handleUpdate = (data: Employee, props: Props) => {
    employeePut(
      props.idEmployee,
      {
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
        address: { id: data.address.id },
      },
      enqueueSnackbar,
      dispatch,
    ).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Funcionário Editado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }
  useEffect(() => {
    hotelPaginate(
      { page: 1, pageSize: 100, filter: {} },
      enqueueSnackbar,
      dispatch,
    )
  }, [])

  const onSubmit = (data: Employee, props: any) => {
    if (props.idEmployee) {
      handleUpdate(data, props)
    } else {
      handleCreate(data, props)
    }
  }
  const handleCreate = (data: Employee, props: any) => {
    employeeCreate(
      {
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
        address: { id: data.address.id },
      },
      enqueueSnackbar,
      dispatch,
    ).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Funcionário cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    props.onClose()
  }

  function handleChange(e) {
    setValue('hotel_id', e.target.value)
  }

  function handleCep(cep: string) {
    if (cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
        setValue('address.street', response.data.logradouro)
        setValue('address.neighborhood', response.data.bairro)
        setValue('address.city', response.data.localidade)
        setValue('address.state', response.data.uf)
      })
    }
  }

  return {
    handleDelete,
    ModalPutEmployee,
    pagination,
    enqueueSnackbar,
    dispatch,
    data,
    isLoading,
    setIsModalVisible,
    setIdModal,
    isModalVisible,
    idModal,
    getEmployeeBanco,
    handleUpdate,
    handleCreate,
    onSubmit,
    close,
    handleChange,
    handleCep,
    setIsVisibled,
    isVisibled,
  }
}
export default function bancoTabela() {
  // const { openModal } = MyContext();
  const [isVisibled, setIsVisibled] = useState(false)
  const [modalIsVisible, setIsModalVisible] = useState(false)
  const [idModal, setIdModal] = useState<string | undefined>(undefined)

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
          <TableMain />
        </BoxDiv>
      </BoxExternal>
      {isVisibled && (
        <ModalEmployee
          onClose={() => setIsVisibled(false)}
          idEmployee={idModal}
        />
      )}
    </>
  )
}
