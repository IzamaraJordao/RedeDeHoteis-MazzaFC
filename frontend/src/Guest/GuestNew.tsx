import React, { useEffect, useState } from 'react'
import ModalGuest from './components/ModalGuest/Modal'
import { Button } from '@mui/material'
import { BoxDiv, BoxExternal } from './styled'

import {
  guestPaginate,
  guestDelete,
  guestPost,
  guestById,
  guestPut,
} from '../api/guest/api-guest'
import { useDispatch, useSelector } from 'react-redux'
import { Guest, selectPaginate, setGuest } from '../store/guestSlice'
import { useSnackbar } from 'notistack'

import Swal from 'sweetalert2'
import axios from 'axios'
import { If } from '../common/components/If'
import { TableGuest } from './components/tableGuest/ColumnGuest'
import { Pagination } from '../template/types/pagination'

export default function PageGuest() {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const pagination = useSelector(selectPaginate)
  const [isVisibled, setIsVisibled] = useState(false)
  const [idGuest, setIdGuest] = useState<string | undefined>(undefined)

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
  async function getGuestBanco(id: string, setValue: any) {
    // Busca o convidado no banco de dados
    guestById(id, enqueueSnackbar, dispatch).then((res) => {
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

  const onSubmit = (data: Guest): any => {
    if (idGuest) {
      handlePut(data)
    } else {
      handleCreate(data)
    }
    handleClose()
  }
  const handleCreate = (data: Guest) => {
    guestPost(data, enqueueSnackbar, dispatch).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Hóspede cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  const handlePut = (data: Guest) => {
    guestPut(idGuest as string, data, enqueueSnackbar, dispatch)
  }

  const handleClose = () => {
    setIsVisibled(false)
    setIdGuest(undefined)
    dispatch(setGuest(undefined))
    guestPaginate(pagination, enqueueSnackbar, dispatch)
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
    guestPaginate(pagination, enqueueSnackbar, dispatch)
  }, [])

  return (
    <div>
      <BoxExternal>
        <BoxDiv>
          <div>
            <Button variant="contained" onClick={() => setIsVisibled(true)}>
              NOVO CADASTRO
            </Button>
          </div>
          <TableGuest
            setIdModal={setIdGuest}
            guestPaginate={(pagination: Pagination<Guest>) =>
              guestPaginate(pagination, enqueueSnackbar, dispatch)
            }
            handleDelete={handleDelete}
            setIsModalVisible={setIsVisibled}
          />
        </BoxDiv>
      </BoxExternal>
      <If condition={isVisibled}>
        <ModalGuest
          getGuest={getGuestBanco}
          onClose={handleClose}
          idGuest={idGuest}
          open={false}
          onSubmit={onSubmit}
          handleCep={handleCep}
        />
      </If>
    </div>
  )
}
