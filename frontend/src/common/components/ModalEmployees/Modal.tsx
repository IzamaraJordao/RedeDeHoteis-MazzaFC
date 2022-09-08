import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ModalCentral, ModalDireita, ModalEsquerda } from './styled';
import TextField from '@mui/material/TextField';
/////////////////Botão Select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useForm } from "react-hook-form";


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
  cpf: String,
  email: String,
  perfil: String,
}

export default function Modal({ onClose }) {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const { register, handleSubmit, formState: { errors } } = useForm<TypeEmployees>();

  const onSubmit = (data: TypeEmployees) => {
    axios.post('http://localhost:4000/employees', {
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      perfil: data.perfil
    })
  }

  function close() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Hospede não cadastrado!',
      showConfirmButton: false,
      timer: 1500
    })
    onClose();
  }



  return (
    <div>

      <Box sx={style}>
        <div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cadastro de Funcionário
          </Typography>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalCentral>
              <ModalEsquerda>
                <span>Nome</span>
                <TextField size='small' id="name" label="Name" variant="outlined" {...register("nome")} />
              </ModalEsquerda>

            </ModalCentral>

            <ModalCentral>
              <div>
                <label>CPF</label>
                <TextField size='small' id="cpf" type="number" label="CPF" variant="outlined" maxRows={11} {...register("cpf")} />
              </div>
              <div>
                <label>RG</label>
                <TextField size='small' id="cpf" type="number" label="RG" variant="outlined" maxRows={11} />
              </div>
              <div>
                <label>Data de Nasc.</label>
                <TextField size='small' id="cpf" type="number" label="Data de Nascimento" variant="outlined" maxRows={11} />
              </div>

            </ModalCentral>
            <ModalCentral>
              <div>
                <label>Email</label>
                <TextField sx={{ width: '360px' }} size='small' id="email" type="email" variant="outlined" label='Email' {...register("email")} />
              </div>
              <div>
                <label>Telefone</label>
                <TextField size='small' id="number" type="number" variant="outlined" />
              </div>
            </ModalCentral>

            <ModalCentral>
              <div>
                <label>CEP</label>
                <TextField size='small' id="outlined-basic" label="CEP" variant="outlined" />
              </div>
              <div>
                <label>Lougradouro</label>
                <TextField sx={{ width: '360px' }} size='small' id="outlined-basic" label="Logradouro" variant="outlined" />
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
                <label>Bairro</label>
                <TextField sx={{ width: '360px' }} size='small' id="outlined-basic" label="CEP" variant="outlined" />
              </div>
              <div>
                <label>Número</label>
                <TextField size='small' id="outlined-basic" label="Logradouro" variant="outlined" />
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
                <label>Cidade</label>
                <TextField sx={{ width: '260px' }} size='small' id="cpf" type="text" label="Cidade" variant="outlined" maxRows={11} />
              </div>
              <div>
                <label>UF</label>
                <TextField sx={{ width: '100px' }} size='small' id="cpf" type="text" label="UF" variant="outlined" maxRows={11} />
              </div>
              <div>
                <label>Complemento</label>
                <TextField size='small' id="cpf" type="text" label="Complemento" variant="outlined" maxRows={11} />
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
                <label>Perfil</label>
                <FormControl fullWidth sx={{ width: '260px' }}>
                  <InputLabel id="demo-simple-select-label"  >Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    /////////
                    onChange={handleChange}
                  // {...register("perfil")}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    {/* <MenuItem >Recepcionista</MenuItem>
                    <MenuItem>Auxiliar de Limpeza</MenuItem>
                    <MenuItem>Camareira</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
              <div>
                <TextField
                  sx={{ width: '320px' }}
                  id="outlined-multiline-static"
                  label="Observação"
                  multiline
                  rows={4}
                  defaultValue="Observação"
                />
              </div>
            </ModalCentral>
            <Button color="success" variant="contained" type='submit'  >Enviar</Button>
            <Button variant="outlined" color="error" onClick={close}>Voltar</Button>
          </form>
        </div>
      </Box>
    </div>
  )
}
