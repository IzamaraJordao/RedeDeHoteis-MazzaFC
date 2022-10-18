import React, { useEffect, useState } from 'react'
import ModalEmployee from '../ModalEmployees/Modal'
import ModalEmployeePut from '../ModalEmployeesPut/Modal'
import { Button } from '@mui/material'
import { employeePaginate, employeeDelete, employeePut } from '../../../api/employee/Api-employee'
import { useDispatch, useSelector } from 'react-redux'
import {
  Employee,
  selectData,
  selectEmployee,
  selectIsFormLoading,
  selectIsLoading,
  selectPaginate,
} from '../../../store/employeeSlice'
import { useSnackbar } from 'notistack'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import TableMain from '../../../common/components/MultTabela/index'
import { Pagination } from '../../../template/types/pagination'
import EditIcon from '@mui/icons-material/Edit'
import { If } from '../../../common/components/If'

export type BancoEmployee = {
  id: number
  nome: string
  rg: string
  cpf: string
  email: string
  phone: string
}

export default function ColumnEmployee() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisiblePut, setIsModalVisiblePut] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const pagination = useSelector(selectPaginate)
  const data = useSelector(selectData)  
  const guest = useSelector(selectEmployee)
  const isLoading = useSelector(selectIsLoading)
  const isFormLoading = useSelector(selectIsFormLoading)
  const [value, setValue] = useState<BancoEmployee>()
  const [idModal, setIdModal] = useState<string>()

  useEffect(() => {
    employeePaginate(pagination, enqueueSnackbar, dispatch)
  }, [])

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

  function ModalPutEmployee(id: string,data: Employee) {
    Swal.fire({
      title: 'Deseja realmente editar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: `Não Editar`,
    }).then((result) => {
      if (result.isConfirmed) {
    employeePut(id,data,enqueueSnackbar,dispatch).then(() => {
      employeePaginate(pagination, enqueueSnackbar, dispatch)
    })
    Swal.fire('Funcionário editado', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')

  }
  }
  ) }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      sortable: false,
      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho
    },

    {
      field: 'cpf',
      headerName: 'CPF',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      sortable: false,
      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho

      renderCell: (employee: GridRenderCellParams<BancoEmployee>) => {
        return (
          <div style={{ color: 'blue', marginLeft: '15px' }}>
            {employee.row.cpf}
          </div>
        )
      },
    },

    {
      field: 'rg',
      headerName: 'RG',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      sortable: false,

      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho
    },

    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      disableColumnMenu: true,
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      disableColumnMenu: true,
    },

    {
      field: 'id',
      headerName: 'Ações',
      headerAlign: 'center',
      width: 150,
      align: 'center',
      disableColumnMenu: true,
      renderCell: (guest: GridRenderCellParams<BancoEmployee>) => {
        return (
          <div>
            <IconButton
              color="error"
              sx={{ backgroundColor: '#fff !important' }}
              onClick={() => {
                handleDelete(guest.row.id)
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: '#fff !important',
                color: 'var(--tertiary)',
              }}
              onClick={() => {
                setIsModalVisiblePut(true), setIdModal(guest.row.id)
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <div>
        <div>
          <div>
           
          </div>
          <TableMain
            data={data}
            columns={columns}
            search={(pagination: Pagination<Employee>) =>
              employeePaginate(pagination, enqueueSnackbar, dispatch)
            }
            isLoading={isLoading}
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.total as number}
          />
        </div>
      </div>

      {isModalVisible ? (
        <ModalEmployee
          onClose={async () => {
            setIsModalVisible(false),
              await employeePaginate(pagination, enqueueSnackbar, dispatch)
          }}
        />
      ) : null}
      <If condition={isModalVisiblePut}>
        <ModalEmployeePut
          onClose={async () => {
            setIsModalVisiblePut(false),
              await employeePaginate(pagination, enqueueSnackbar, dispatch)
          }}
          idEmployee={idModal}
        />
      </If>
    </div>
  )
}
