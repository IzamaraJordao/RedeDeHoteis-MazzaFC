import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { InputNomeModal, ModalExterna } from './styled'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { MenuItem, Select } from '@mui/material'
import { Bedroom, BedroomStatus } from '../../../store/bedroomSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectBedroomData } from '../../../store/bedroomSlice'
import { statusPaginate } from '../../../api/status/api-status'
import { selectPaginate, selectStatusData, Status } from '../../../store/statusSlice'
import { useSnackbar } from 'notistack'
import { selectTypeData } from '../../../store/typeSlice'
import { typePaginate } from '../../../api/type/api-type'
import { bedroomPut } from '../../../api/bedroom/api-bedroomFloors'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type Props = {
  onClose: () => void
  roomSelected: Bedroom | null
  pos_x: number
  pos_y: number
}


export default function ModalBedroom(props: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const statusList = useSelector(selectStatusData)
  const types = useSelector(selectTypeData)

  const [type, setType] = React.useState<string>()
  const [status, setStatus] = React.useState<string>()

  console.log(" roomSelected ", props.roomSelected)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Bedroom>()

  const onSubmit = (data: Bedroom) => {
    // if(props.roomSelected?.room_type_id == '6'){
    //   enqueueSnackbar("Tipo de Quarto é obrigatório", { variant: 'error' })
    //   return;
    // }
    bedroomPut(props.roomSelected?.id, {
      id: props.roomSelected?.id,
      name: data.name,
      floor: props.roomSelected?.floor as string,
      hotel_id: props.roomSelected?.hotel_id as string,
      position_x: props.pos_x,
      position_y: props.pos_y,
      status_room_id: data.status_room_id,
      room_type_id: type as string,
    }, enqueueSnackbar, dispatch)
    props.onClose()
  }

useEffect(() => {
    if (props.roomSelected?.position_x != null){
      setValue('name', props.roomSelected?.name)
      setValue('status_room_id', props.roomSelected?.status_room_id)
      // setType(props.roomSelected?.room_type_id)
      setStatus(props.roomSelected?.status_room_id)
    } 
  }, [props.roomSelected])

  useEffect(() => {
    statusPaginate(
      { page: 1, pageSize: 100, filter: {} },
      enqueueSnackbar,
      dispatch,
    )
    typePaginate(
      { page: 1, pageSize: 100, filter: {} },
      enqueueSnackbar,
      dispatch,
    )

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
            Cadastro de Quarto
          </Typography>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <InputNomeModal>
            <label>Nome do quarto</label>
            <TextField id="outlined-basic" variant="outlined"
              {...register('name', { required: true })}
            />
          </InputNomeModal>

          <div>
            <InputNomeModal>
              <label>Status do quarto</label>
              <Select
                sx={{ width: '200px' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="hotel"
                defaultValue={props.roomSelected?.status_room_id}
              {...register('status_room_id')}
              >
                <MenuItem value="" selected sx={{ width: '250px' }}>
                  Selecione...
                </MenuItem>
                {statusList.map((status) => (
                  <MenuItem value={status.id}>{status.name}</MenuItem>
                ))}
              </Select>
            </InputNomeModal>
          </div>
          <div>
            <InputNomeModal>
              <label>Tipo de Quarto</label>
              <Select
                sx={{ width: '200px' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="hotel"
                defaultValue={props.roomSelected?.room_type_id}
                {...register('room_type_id')}
              >
                
                {types.map((type) => (
                  <MenuItem value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </InputNomeModal>
          </div>

          <div>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>Salvar</Button>
            <Button variant="contained" color="error" onClick={props.onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </Box>

    </ModalExterna>
  )
}
