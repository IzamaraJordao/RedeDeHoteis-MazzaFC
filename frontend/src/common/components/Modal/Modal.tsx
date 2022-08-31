import React from 'react';
import Swal from 'sweetalert2'
import { Modal, ModalCentral, ModalDireita, ModalEsquerda } from './styled';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

export type ModalProps = {
  nome: string;
  cpf: string;

}

const schema = Yup.object({
  nome: Yup.string().required("Nome é obrigatório"),
  cpf: Yup.string().required("CPF é obrigatório").max(11, "CPF deve ter no máximo 11 caracteres").min(11, "CPF deve ter no mínimo 11 caracteres"),
}).required();

export default function BasicModal({ onClose }) {


  const [hospedes, setHospedes] = React.useState<ModalProps[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<ModalProps>({ resolver: yupResolver(schema) });

  const onSubmit = (data: ModalProps) => {
    axios.post("http://localhost:4000/hospedes", {
      nome: data.nome,
      cpf: data.cpf

    }).then((res) => {
      setHospedes([...hospedes, res.data]);
    })


    Swal.fire({
      title: 'Hospede cadastrado com sucesso!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    onClose();
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

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (


    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Reserva
      </Typography>
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal>
          <ModalCentral>
            <ModalEsquerda>
              <label>Quarto</label>
              <TextField id="outlined-basic" label="Quarto" variant="outlined" />
            </ModalEsquerda>
            <div>
              <label>Andar</label>
              <div>
                <TextField id="outlined-basic" type="number" label="Andar" variant="outlined" />
              </div>
            </div>
          </ModalCentral>

          <ModalCentral>
            <div>
              <label>CPF</label>
              <TextField id="cpf" type="number" label="CPF" variant="outlined" maxRows={11} {...register("cpf")} />
              <p>{errors.cpf?.message}</p>
            </div>

            <ModalDireita>
              <label>Hospedes</label>
              <TextField id="nome" label="Hospedes" variant="outlined"  {...register("nome")} />
              <p>{errors.nome?.message}</p>
            </ModalDireita>
          </ModalCentral>
          <ModalCentral>
            <div>
              <label>CHECK IN</label>
              <TextField id="outlined-basic" type="date" variant="outlined" />
            </div>
            <div>
              <label>CHECK OUT</label>
              <TextField id="outlined-basic" type="date" variant="outlined" />
            </div>
          </ModalCentral>
          <ModalCentral>
            <div>
              <label>Telefone</label>
              <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
            <div>
              <label>Situação</label>
              <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
          </ModalCentral>
          <ModalCentral>
            <div>

              <TextField
                id="outlined-multiline-static"
                label="Observação"
                multiline
                rows={4}
                defaultValue="Observação"
              />
            </div>
          </ModalCentral>
          
          <Button color="success" variant="contained" type='submit' >Enviar</Button>
          {/* <button>Enviar</button> */}
        </Modal>
      </form>
      <Button variant="outlined" color="error" onClick={close}>Voltar</Button>
      </div>
        </Box >
    
  );
}

