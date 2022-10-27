import { useEffect, useState } from 'react'
import ModalEmployee from '../ModalEmployees/Modal'

import { employeePaginate } from '../../../api/employee/Api-employee'

import { Employee, selectData, selectIsLoading, selectPaginate } from '../../../store/employeeSlice'
import { useSnackbar } from 'notistack' 
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import TableMain from '../../../common/components/MultTabela/index'
import { Pagination } from '../../../template/types/pagination'
import EditIcon from '@mui/icons-material/Edit'
import { If } from '../../../common/components/If'
import React from 'react'
import { useSelector } from 'react-redux'

export interface BancoEmployee {
  id: number
  nome: string
  rg: string
  cpf: string
  email: string
  phone: string
}
 type Props={
  setIdModal: React.Dispatch<React.SetStateAction<string | undefined>>
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  employeePaginate: (pagination: Pagination<Employee>) => void
  handleDelete: (id: string) => void

 }
export function TableEmployee(props:Props) {
  const pagination = useSelector(selectPaginate)
  const data = useSelector(selectData )
  const isLoading = useSelector(selectIsLoading)

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
                props.handleDelete(employee.row.id)
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: '#fff !important',
                color: 'var(--tertiary)',
               margin:'8px'
              }}
              onClick={() => {
                props.setIdModal(employee.row.id)
                props.setIsModalVisible(true)
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
              props.employeePaginate(pagination)
            }
            isLoading={isLoading}
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.total as number}
          />
        </div>
      </div>

    </div>
  )
}
