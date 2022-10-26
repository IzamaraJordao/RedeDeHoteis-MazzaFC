import { useEffect, useState } from 'react'
import ModalEmployee from '../ModalEmployees/Modal'

import { employeePaginate } from '../../../api/employee/Api-employee'

import { Employee } from '../../../store/employeeSlice'
import { useSnackbar } from 'notistack'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import TableMain from '../../../common/components/MultTabela/index'
import { Pagination } from '../../../template/types/pagination'
import EditIcon from '@mui/icons-material/Edit'
import { If } from '../../../common/components/If'
import React from 'react'
import { MyContext } from '../../Employees'

export interface BancoEmployee {
  id: number
  nome: string
  rg: string
  cpf: string
  email: string
  phone: string
}

export default function ColumnEmployee() {
  const {
    handleDelete,
    ModalPutEmployee,
    pagination,
    enqueueSnackbar,
    handleUpdate,
    dispatch,
    data,
    isLoading,
    setIsModalVisible,
    setIdModal,
    isModalVisible,
    idModal,
  } = MyContext()

  useEffect(() => {
    employeePaginate(pagination, enqueueSnackbar, dispatch)
  }, [])

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
      renderCell: (employee: GridRenderCellParams<BancoEmployee>) => {
        return (
          <div>
            <IconButton
              color="error"
              sx={{ backgroundColor: '#fff !important' }}
              onClick={() => {
                handleDelete(employee.row.id)
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
                setIdModal(employee.row.id)
                setIsModalVisible(true)
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
              setIdModal(undefined),
              await employeePaginate(pagination, enqueueSnackbar, dispatch)
          }}
          props={idModal}
        />
      ) : null}
    </div>
  )
}
