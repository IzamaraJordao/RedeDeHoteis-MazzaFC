import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import {
  Guest,
  selectData,
  selectIsLoading,
  selectPaginate,
} from '../../../store/guestSlice'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { Pagination } from '../../../template/types/pagination'
import TableMain from '../../../common/components/MultTabela/index'


export type BancoGuest = {
  id: number
  nome: string
  rg: string
  cpf: string
  email: string
  phone: string
}

type Props = {
  setIdModal: React.Dispatch<React.SetStateAction<string | undefined>>
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  handleDelete: (id: string) => void
  guestPaginate: (pagination: Pagination<Guest>) => void
}

export function TableGuest(props: Props) {
  const pagination = useSelector(selectPaginate)
  const data = useSelector(selectData)
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

      renderCell: (employee: GridRenderCellParams<BancoGuest>) => {
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
      renderCell: (guest: GridRenderCellParams<BancoGuest>) => {
        return (
          <div>
            <IconButton
              color="error"
              sx={{ backgroundColor: '#fff !important' }}
              onClick={() => {
                props.handleDelete(guest.row.id)
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
                props.setIsModalVisible(true), 
                props.setIdModal(guest.row.id)
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
      <TableMain
        data={data}
        columns={columns}
        search={(pagination: Pagination<Guest>) =>
          props.guestPaginate(pagination)
        }
        isLoading={isLoading}
        page={pagination.page}
        pageSize={pagination.pageSize}
        total={pagination.total as number}
      />
    </div>
  )
}
