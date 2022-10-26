import React, { useEffect, useState } from 'react'
import ModalRegistration from './components/ModalRegistration/Modal'
import { Button } from '@mui/material'
import { BoxDiv, BoxExternal } from './styled'
import { guestPaginate, guestDelete } from '../api/guest/api-guest'
import {hotelDelete, hotelPaginate} from '../api/hotel/api-hotel'
import { useDispatch, useSelector } from 'react-redux'
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
import { Hotel,
  selectData,
  selectHotel,
  selectIsFormLoading,
  selectIsLoading,
  selectPaginate,
 } from '../store/hotelSlice'


export default function PageGuest() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisiblePut, setIsModalVisiblePut] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const pagination = useSelector(selectPaginate)
  const data = useSelector(selectData)
  const hotel = useSelector(selectHotel)
  const isLoading = useSelector(selectIsLoading)
  const isFormLoading = useSelector(selectIsFormLoading)
  const [value, setValue] = useState<Hotel>()
  const [idModal, setIdModal] = useState<string>()

  useEffect(() => {
    hotelPaginate(pagination, enqueueSnackbar, dispatch)
  }, [])

  function handleDelete(id: string) {
    console.log(id)
    Swal.fire({
      title: 'Deseja realmente excluir?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      denyButtonText: `Não Remover`,
    }).then((result) => {
      if (result.isConfirmed) {
        hotelDelete(id, enqueueSnackbar, dispatch).then(() => {
          hotelPaginate(pagination, enqueueSnackbar, dispatch)
        })
        Swal.fire('Hotel excluido', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  function ModalPutGuest(id: string) {
    setIsModalVisiblePut(true)
    axios.get(`http://localhost:3030/guest/${id}`).then((response) => {
      setValue(response.data)
    })
  }

  const columns: GridColDef[] = [
    
    { field: 'cnpj',
      headerName: 'CNPJ',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      sortable: false,
      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho
      
      renderCell: (hotel: GridRenderCellParams<Hotel>) => {
        return (
          <div style={{ color: 'blue', marginLeft: '15px' }}>
            {hotel.row.cnpj}
          </div>
        )
      },
    },
    
    { field: 'name',
      headerName: 'Nome do Hotel',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      sortable: false,
      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho
    },

    { field: 'email',
      headerName: 'Email',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      disableColumnMenu: true,
    },

    { field: 'floors',
      headerName: 'Andare',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      sortable: false,
      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho
    },

    { field: 'phone',
      headerName: 'Telefone',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      disableColumnMenu: true,
    },

    { field: 'id',
      headerName: 'Ações',
      headerAlign: 'center',
      width: 150,
      align: 'center',
      disableColumnMenu: true,
      renderCell: (hotel: GridRenderCellParams<Hotel>) => {
        return (
          <div>
            <IconButton
              color="error"
              sx={{ backgroundColor: '#fff !important' }}
              onClick={() => {
                handleDelete(hotel.row.id)
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
                setIsModalVisiblePut(true), setIdModal(hotel.row.id)
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
            search={(pagination: Pagination<Hotel>) =>
              guestPaginate(pagination, enqueueSnackbar, dispatch)
            }
            isLoading={isLoading}
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.total as number}
          />
        </BoxDiv>
      </BoxExternal>

      {isModalVisible ? (
        <ModalRegistration
          onClose={async () => {
            setIsModalVisible(false),
              await hotelPaginate(pagination, enqueueSnackbar, dispatch)
          }}
        />
      ) : null}
    </div>
  )
}
