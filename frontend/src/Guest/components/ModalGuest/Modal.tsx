import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
  ModalCentral,
  InputNomeModal,
  ModalExterna,
} from '../../../common/components/styled/styled'
import TextField from '@mui/material/TextField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import PageGuest from '../../GuestNew'
import {
  Guest,
  selectData,
  selectGuestData,
  selectPaginate,
  setGuest,
} from '../../../store/guestSlice'
import { guestPaginate, guestPost } from '../../../api/guest/api-guest'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type Props = {
  onClose: () => void
  open: boolean
  idGuest: string | undefined
  getGuest: (id: string, setValue: any) => Promise<void>
  onSubmit: (data: Guest, setValue: any) => Promise<Guest>
  handleCep: (cep: string, setValue: any) => Promise<void>
}

export default function ModalGuest(props: Props) {
  const dispatch = useDispatch()
  const pagination = useSelector(selectPaginate)
  const [isVisibled, setIsVisibled] = useState(false)
  const [idGuest, setIdGuest] = useState<string | undefined>(undefined)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Guest>()

  const guest = useSelector(selectGuestData)

  const dataGuest = async (id: Required<Guest>['id']) => {
    return await props.getGuest(id as string, setValue)
  }

  useEffect(() => {
    if (props.idGuest) {
      dataGuest(props.idGuest)
      if (guest) {
        setValue('name', guest.name)
        setValue('cpf', guest.cpf)
        setValue('rg', guest.rg)
        setValue('email', guest.email)
        setValue('phone', guest.phone)
        setValue('address.street', guest.address.street)
        setValue('address.number', guest.address.number)
        setValue('address.complement', guest.address.complement)
        setValue('address.neighborhood', guest.address.neighborhood)
        setValue('address.city', guest.address.city)
        setValue('address.state', guest.address.state)
        setValue('address.zipCode', guest.address.zipCode)
      }
    } else {
      dispatch(setGuest(undefined))
    }
  }, [])

  return (
    <ModalExterna>
      <Box sx={style}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            color={'var(--text)'}
          >
            {props.idGuest === undefined
              ? 'Cadastrar Hóspede'
              : 'Editar Hóspede'}
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
                sx={{ width: '687px' }}
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
                    sx={{ width: '695px', color: 'var(--text)' }}
                    size="small"
                    id="email"
                    variant="outlined"
                    {...register('email')}
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
                    onChange={(e) => props.handleCep(e.target.value, setValue)}
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
                    sx={{ width: '560px' }}
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
            </ModalCentral>
            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>Cidade</label>
                  <TextField
                    sx={{ width: '360px' }}
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
              sx={{ bgcolor: 'var(--text)' }}
              variant="contained"
              type="submit"
            >
              Enviar
            </Button>
            <Button
              sx={{ marginLeft: '10px' }}
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
  )
}
