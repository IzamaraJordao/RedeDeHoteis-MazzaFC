import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ModalInterna, ModalExterna, ModalInternaFloors } from './styled'
import TextField from '@mui/material/TextField'
/////////////////Botão Select
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { range } from 'ramda'

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
  nome: String
  andares: Number
  unidades: Number
  perfil: String
}

export default function Modal({ onClose }) {
  const [numberOfRoom, setNumberOfRoom] = React.useState<number>(0)
  const [walk, setWalk] = React.useState(false)
  const [age, setAge] = React.useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeEmployees>()

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

  function formFloorRooms() {
    const floors = range(1, numberOfRoom + 1)  
    return (
      <div>
        {floors.map((floor) => (
            <ModalInternaFloors key={floor}>
              <ModalExterna>
                <ModalInterna>
                  <label htmlFor={`floorName${floor}`}>Nome do andar</label>
                  <TextField id={`floorName${floor}`} />
                </ModalInterna>
                <ModalInterna>
                  <label htmlFor={`numberRooms${floor}`}>Qtde quartos</label>
                  <TextField id={`numberRooms${floor}`} />
                </ModalInterna>
              </ModalExterna>
            </ModalInternaFloors>
           
        ))}
      </div>
    )
  }



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
                <TextField size="small" id="name" {...register('nome')} />
              </ModalInterna>
            </ModalInterna>

            <ModalInterna>
              <label>Quantidade de Andares</label>
              <TextField
                sx={{ width: '100px' }}
                size="small"
                id="andares"
                variant="outlined"
                {...register('andares')}
                onChange={(e) => setNumberOfRoom(Number(e.target.value))}
              />
              {numberOfRoom > 0 && formFloorRooms()}
            </ModalInterna>
            <ModalExterna>
              <ModalInterna>
                <label>CEP</label>
                <TextField size="small" />
              </ModalInterna>

              <ModalInterna>
                <label>Lougradouro</label>
                <TextField
                  sx={{ width: '600px' }}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
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
                />
              </ModalInterna>


              <ModalInterna>
                <label>Número</label>
                <TextField size="small" id="outlined-basic" variant="outlined" />
              </ModalInterna>
              <ModalInterna>
                <label>Cidade</label>
                <TextField
                  sx={{ width: '260px' }}
                  size="small"
                  id="cpf"
                  type="text"
                  variant="outlined"
                  maxRows={11}
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
                  maxRows={11}
                />
              </ModalInterna>
              <ModalInterna>
                <label>Complemento</label>
                <TextField
                  size="small"
                  id="cpf"
                  type="text"
                  variant="outlined"
                  maxRows={11}
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
