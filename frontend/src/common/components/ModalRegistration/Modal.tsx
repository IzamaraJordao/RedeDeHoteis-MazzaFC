import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ModalCentral, ModalEsquerda, ModalExterna, InputModal } from './styled';
import TextField from '@mui/material/TextField';
/////////////////Botão Select
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import {range} from 'ramda'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export type TypeEmployees = {
  nome: String,
  andares: Number,
  unidades: Number,
  perfil: String,
}

export default function Modal({ onClose }) {

  const [numberOfRoom, setNumberOfRoom] = React.useState<number>(0);
  const [walk, setWalk] = React.useState(false);
  const [age, setAge] = React.useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<TypeEmployees>();

  function close() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Hotel não cadastrado!',
      showConfirmButton: false,
      timer: 1500
    })
    onClose();
  }

  function formFloorRooms(){
    const floors = range(1, numberOfRoom + 1 );
    return(
      <InputModal>
        {
          floors.map(floor => (
            <div key={floor}>
              <div>
              <label htmlFor={`floorName${floor}`}>Nome/Numero andar</label>
              <TextField id={`floorName${floor}`}/>
              </div>
              <div>
              <label htmlFor={`numberRooms${floor}`}>Qtde quartos</label>
              <TextField id={`numberRooms${floor}`}/>
              </div>
            </div>
          ))
        }
      </InputModal>
    )
  }


  return (
    <ModalExterna>

      <Box sx={style}>
        <div>
          <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h4" component="h2">
           Cadastro do Hotel
          </Typography>
        </div>
        <div>
          <form >
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <ModalCentral>
              <ModalEsquerda>
                <label>Nome do hotel</label>
                <TextField size='small' id="name" variant="outlined" {...register("nome")} />
              </ModalEsquerda>
            </ModalCentral>

            <ModalCentral>
              <div>
                <label>Quantidade de Andares</label>
                <TextField sx={{ width: '100px', textAlign: 'center' }} size='small' id="andares"  variant="outlined" {...register("andares")}  onBlur={(e)=> setNumberOfRoom(Number( e.target.value))}/>
              </div>
              {numberOfRoom > 0 && formFloorRooms()}
            </ModalCentral>
           

            <ModalCentral>
              <div>
                <label>CEP</label>
                <TextField size='small' id="outlined-basic" type="number"  variant="outlined" />
              </div>
              <div>
                <label>Lougradouro</label>
                <TextField sx={{ width: '360px' }} size='small' id="outlined-basic" variant="outlined" />
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
                <label>Bairro</label>
                <TextField sx={{ width: '360px' }} size='small' id="outlined-basic" variant="outlined" />
              </div>
              <div>
                <label>Número</label>
                <TextField size='small' id="outlined-basic" variant="outlined" />
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
                <label>Cidade</label>
                <TextField sx={{ width: '260px' }} size='small' id="cpf" type="text" variant="outlined" maxRows={11} />
              </div>
              <div>
                <label>UF</label>
                <TextField sx={{ width: '100px' }} size='small' id="cpf" type="text" variant="outlined" maxRows={11} />
              </div>
              <div>
                <label>Complemento</label>
                <TextField size='small' id="cpf" type="text" variant="outlined" maxRows={11} />
              </div>
            </ModalCentral>

            <Button color="success" variant="contained" type='submit'  >Enviar</Button>
            <Button variant="outlined" color="error" onClick={close}>Voltar</Button>
          </form>
        </div>
      </Box>
    </ModalExterna>
  )
}
