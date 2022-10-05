import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ModalCentral, InputNomeModal } from './styled';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { handleRequest } from '../../../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export type TypeEmployees = {
  name: string,
  rg: string,
  cpf: string,
  email: string,
  phone: string,
  password: string,
  address: {
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string
  },
  hotel_id: string,
}

export default function Modal({ onClose }) {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const { register, setValue, handleSubmit, formState: { errors } } = useForm<TypeEmployees>();

  const onSubmit = (data: TypeEmployees) => {
    // handleRequest({ method: 'post', url: '/employee', data },
    // console.log)
    axios.post('http://localhost:3030/employee', {
      name: data.name,
      rg: data.rg,
      cpf: data.cpf,
      email: data.email,
      
      phone: data.phone,
      password: data.password,
      address: {
        street: data.address.street,
        number: data.address.number,
        complement: data.address.complement,
        neighborhood: data.address.neighborhood,
        city: data.address.city,
        state: data.address.state,
        zipCode: data.address.zipCode
      },
      hotel_id: data.hotel_id
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Funcionário cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })
      })
    onClose();
  }



  function handleCep(cep: string) {

    if (cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          setValue('address.street', response.data.logradouro)
          setValue('address.neighborhood', response.data.bairro)
          setValue('address.city', response.data.localidade)
          setValue('address.state', response.data.uf)
        })
    }

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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography id="modal-modal-title" variant="h4" component="h2" color={'var(--text)'}>
            Cadastro de Funcionário
          </Typography>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputNomeModal>
              <label>Nome</label>
              <TextField
                size='small' id="name"  {...register("name")} />
            </InputNomeModal>

            <ModalCentral>
              <div>
                <InputNomeModal>
                  <label>CPF</label>
                  <TextField size='small' id="cpf" type="number" variant="outlined" maxRows={11} {...register("cpf")} />
                </InputNomeModal>
              </div>
              <div>
                <InputNomeModal>
                  <label>RG</label>
                  <TextField size='small' id="rg" type="text" variant="outlined" maxRows={11} {...register("rg")} />
                </InputNomeModal>
              </div>

              <div>
                <InputNomeModal>
                  <label>Telefone</label>
                  <TextField size='small' id="phone" type="number" variant="outlined" {...register("phone")} />
                </InputNomeModal>
              </div>

            </ModalCentral>
            <ModalCentral>
              <div>
              <InputNomeModal>
                <label>Email</label>
                <TextField sx={{ width: '360px', color: 'var(--text)' }} size='small' id="email" variant="outlined" {...register("email")} />
                </InputNomeModal>
              </div>
              <div>
              <InputNomeModal>
                <label>Senha</label>
                <TextField size='small' type="number" variant="outlined" maxRows={11} {...register("password")} />
                </InputNomeModal>
              </div>
            </ModalCentral>

            <ModalCentral>
              <div>
              <InputNomeModal>
                <label>CEP</label>
                <TextField size='small' variant="outlined" {...register("address.zipCode")} onChange={(e) => handleCep(e.target.value)} />
                </InputNomeModal>
              </div>
              <div>
              <InputNomeModal>
                <label>Rua</label>
                <TextField sx={{ width: '360px', color: 'var(--text)' }} size='small' id="outlined-basic" variant="outlined" {...register("address.street")} />
                </InputNomeModal>
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
              <InputNomeModal>
                <label>Bairro</label>
                <TextField sx={{ width: '160px' }} size='small' variant="outlined" {...register("address.neighborhood")} />
                </InputNomeModal>
              </div>
              <div>
              <InputNomeModal>
                <label>Número</label>
                <TextField size='small' id="outlined-basic" variant="outlined" {...register("address.number")} />
                </InputNomeModal>
              </div>
              <div>
              <InputNomeModal>
                <label>Hotel</label>
                <TextField size='small' id="outlined-basic" variant="outlined" {...register("hotel_id")} />
                </InputNomeModal>
              </div>
            </ModalCentral>
            <ModalCentral>
              <div>
              <InputNomeModal>
                <label>Cidade</label>
                <TextField sx={{ width: '260px' }} size='small' id="cpf" type="text" variant="outlined" maxRows={11} {...register("address.city")} />
                </InputNomeModal>
              </div>
              <div>
              <InputNomeModal>
                <label>UF</label>
                <TextField sx={{ width: '100px' }} size='small' id="cpf" type="text" variant="outlined" maxRows={11} {...register("address.state")} />
                </InputNomeModal>
              </div>
              <div>
              <InputNomeModal>
                <label>Complemento</label>
                <TextField size='small' id="cpf" type="text" variant="outlined" maxRows={11} {...register("address.complement")} />
                </InputNomeModal>
              </div>
            </ModalCentral>

            <Button sx={{bgcolor: 'var(--text)'}} variant="contained" type='submit'  >Enviar</Button>
            <Button variant="contained" color="error" onClick={close}>Cancelar</Button>
          </form>
        </div>
      </Box>
    </div>
  )
}
         