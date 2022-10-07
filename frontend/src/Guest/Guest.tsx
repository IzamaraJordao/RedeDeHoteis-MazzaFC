import React, { useEffect, useState } from 'react'
import ModalGuest from '../common/components/ModalGuestPost/Modal'
import ModalGuestPut, { TypeGuest } from '../common/components/ModalGuestPut/Modal'
import { Button } from '@mui/material'
import { BoxDiv, BoxExternal } from './styled'
import { guestPaginate, guestDelete } from '../api/guest/api-guest'
import { useDispatch, useSelector } from 'react-redux'
import {
  Guest,
  selectData,
  selectGuest,
  selectIsFormLoading,
  selectIsLoading,
  selectPaginate,
} from '../store/guestSlice'
import { useSnackbar } from 'notistack'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import TableMain from '../common/components/MultTabela/index'
import { Pagination } from '../template/types/pagination'
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios'
import { If } from '../common/components/If'
import { useRouter } from 'next/router'

export type BancoGuest = {
  id: number
  nome: string
  rg: string
  cpf: string
  email: string
  phone: string
  address
}

export default function PageGuest() {

  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const pagination = useSelector(selectPaginate)
  const data = useSelector(selectData)
  const guest = useSelector(selectGuest)
  const isLoading = useSelector(selectIsLoading)
  const isFormLoading = useSelector(selectIsFormLoading)
  
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisiblePut, setIsModalVisiblePut] = useState(false)
  const [value, setValue] = useState<BancoGuest>()
  const [idModal, setIdModal] = useState<any>()
  

  useEffect(() => {
    guestPaginate(pagination, enqueueSnackbar, dispatch)
  }, [])

  useEffect(() => {
    if(router.query.id){
      setIsModalVisiblePut(true)
    }
  },[router.query.id])

  function handleDelete(id: string) {
    Swal.fire({
      title: 'Deseja realmente excluir?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      denyButtonText: `Não Remover`,
    }).then((result) => {
      if (result.isConfirmed) {
        guestDelete(id, enqueueSnackbar, dispatch).then(() => {
          guestPaginate(pagination, enqueueSnackbar, dispatch)
        })
        Swal.fire('Hospede excluido', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


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
                setIdModal(guest.row.id) , setIsModalVisiblePut(true)
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
        )
      },
    },
  ]

  console.log('idModal', idModal)

  return (
    <div>
      <BoxExternal>
        <BoxDiv>
          <div>
            <Button variant="contained" onClick={() => setIsModalVisible(true)}>
              NOVO CADASTRO
            </Button>
          </div>
          <TableMain
            data={data}
            columns={columns}
            search={(pagination: Pagination<Guest>) =>
              guestPaginate(pagination, enqueueSnackbar, dispatch)
            }
            isLoading={isLoading}
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.total as number}
          />
        </BoxDiv>
      </BoxExternal>


      {/* <If condition={isModalVisiblePut}>
        <ModalGuest
          onClose={async () => {
            setIsModalVisiblePut(false)
            router.replace({
              pathname: '/guest',
            })
          } }
          
        />
      </If> */}
     {isModalVisiblePut && 
        <ModalGuestPut
          onClose={async () => {
            setIsModalVisible(false)
            router.replace({
              pathname: '/guest',
            })
          } }
          id={idModal}
        />
       
        }
    </div>
  )
}
