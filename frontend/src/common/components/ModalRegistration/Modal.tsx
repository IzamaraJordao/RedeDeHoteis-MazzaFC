import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ModalInterna, ModalExterna, ModalInternaFloors } from './styled'
import TextField from '@mui/material/TextField'
/////////////////Botão Select
import Swal from 'sweetalert2'
import { useFieldArray, useForm } from 'react-hook-form'
import { range } from 'ramda'
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #00000047',
  boxShadow: 24,
  p: 4,
  scroll: 'auto',
}

export type TypeEmployees = {

  name: String
  floor: Number
  unidades: Number
  perfil: String
  address: {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  floors:{
    floor: Number
    units: Number
  }[]
}

export default function Modal({ onClose }) {
  const [numberOfRoom, setNumberOfRoom] = React.useState<number>(0)
  const [walk, setWalk] = React.useState(false)
  const [age, setAge] = React.useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<TypeEmployees>()

  
  const { fields, append, remove } = useFieldArray({
    name: "floors", 
    control,
  })

  function close() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Hotel não cadastrado!',
      showConfirmButton: false,
      timer: 1500,
    })
    onClose()
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


  function formFloorRooms() {
    const floors = range(1, numberOfRoom + 1)  
    console.log(floors)
    return (
      <div>
        {floors.map((floor, index) => (
            <ModalInternaFloors key={floor}>
              <ModalExterna>
                <ModalInterna>
                  <label htmlFor={`floorName${floor}`}>Nome do andar</label>
                  <TextField {...register(`floors.${index}.floor`)} />
                  {/* <TextField id={`floorName${floor}`} /> */}
                </ModalInterna>
                <ModalInterna>
                  <label >Qtde quartos</label>
                  <TextField  {...register(`floors.${index}.units`)} />
                </ModalInterna>
              </ModalExterna>
            </ModalInternaFloors>
            
        ))}
        </div>
      
    )
  }
  console.log(watch('floors'))
  
  return (
    <div>
      <Box sx={style}>
        <div>
          <Typography
            sx={{ textAlign: 'center', color: 'var(--text)' }}
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Cadastro do Hotel
          </Typography>
        </div>
        <div>
          <form>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <ModalInterna>
              <ModalInterna>
                <label>Nome do hotel</label>
                <TextField size="small" id="name" {...register('name')} />
              </ModalInterna>
            </ModalInterna>

            <ModalInterna>
              <label>Quantidade de Andares</label>
              <TextField
                sx={{ width: '100px' }}
                size="small"
                id="andares"
                variant="outlined"
                {...register('floor')}
                onChange={(e) => setNumberOfRoom(Number(e.target.value))}
              />
              {numberOfRoom > 0 && formFloorRooms()}
            </ModalInterna>
            <ModalExterna>
              <ModalInterna>
                <label>CEP</label>
                <TextField size="small"  {...register('address.zipCode')}
                    onChange={(e) => handleCep(e.target.value)}  />
              </ModalInterna>

              <ModalInterna>
                <label>Lougradouro</label>
                <TextField
                  sx={{ width: '600px' }}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  {...register('address.street')}
                />
              </ModalInterna>
            </ModalExterna>
            <ModalExterna>
              <ModalInterna>
                <label>Bairro</label>
                <TextField
                  sx={{ width: '360px' }}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  {...register('address.neighborhood')}
                />
              </ModalInterna>


              <ModalInterna>
                <label>Número</label>
                <TextField 
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  {...register('address.number')}
                  />
                  
              </ModalInterna>
              <ModalInterna>
                <label>Cidade</label>
                <TextField
                  sx={{ width: '260px' }}
                  size="small"
                  id="cpf"
                  type="text"
                  variant="outlined"
                  {...register('address.city')}
               
                />
              </ModalInterna>
            </ModalExterna>

            <ModalExterna>
              <ModalInterna>
                <label>UF</label>
                <TextField
                  sx={{ width: '100px' }}
                  size="small"
                  id="cpf"
                  type="text"
                  variant="outlined"
                  {...register('address.state')}
                />
              </ModalInterna>
              <ModalInterna>
                <label>Complemento</label>
                <TextField
                  size="small"
                  id="cpf"
                  type="text"
                  variant="outlined"           
                  {...register('address.complement')}
                />
              </ModalInterna>
            </ModalExterna>

            <Button color="success" variant="contained" type="submit" sx={{ marginRight: '10px', marginTop: '10px' }}>
              Enviar
            </Button>
            <Button variant="contained" color="error" onClick={close} sx={{ marginTop: '10px' }}>
              Voltar
            </Button>
          </form>
        </div>
      </Box>
    </div>
  )
}
