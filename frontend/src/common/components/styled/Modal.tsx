import React , {useState } from 'react';
import Swal from 'sweetalert2'
import {ModalCentral, ModalDireita, ModalEsquerda, External } from './styled';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

export type ModalProps = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  observacao: string;
  checkin: Date;
  checkout: Date;
}
export type BancoHospedes = {
  id: Number;
  nome: String;
  cpf: String;
  email: String;
  observacao: String;
  telefone: String;
}

export type BancoReserva = {
  id: Number;
  consumo: String;
  checkin: Date;
  checkout: Date;
}


const schema = Yup.object({
  nome: Yup.string().required("Nome é obrigatório"),
  cpf: Yup.string().required("CPF é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  telefone: Yup.string().required("Telefone é obrigatório"),
});



export default function BasicModal({ onClose }) {

  const [hospedes, setHospedes] = useState<ModalProps[]>([]);
  const [reserva, setReserva] = useState<ModalProps[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<ModalProps>({ resolver: yupResolver(schema) });

  const onSubmit = (data: ModalProps ) => {
    axios.post("http://localhost:3000/guest", {
      nome: data.nome,
      cpf: data.cpf

    }).then((res) => {
      setHospedes([...hospedes, res.data]);
    })

    axios.post("http://localhost:3000/reservations", {
      checkin: data.checkin,
      checkout: data.checkout,
  }).then((res) => {
    setReserva([...reserva,res.data])
  })

  
  }
    function salve() {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Hospede cadastrado!',
        showConfirmButton: false,
        timer: 1500
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
    // transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,

    p: 4,
  };

  return(
    <External>
      <Box sx={style}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>          
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
                  <TextField id="outlined-basic" type="date" variant="outlined" {...register("checkin")} />
                </div>
                <div>
                  <label>CHECK OUT</label>
                  <TextField id="outlined-basic" type="date" variant="outlined" {...register("checkout")}/>
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

              <Button color="success" variant="contained" type='submit' onClick={salve} >Enviar</Button>
           
          </form>
          <Button variant="outlined" color="error" onClick={close}>Voltar</Button>
        </div>
      </Box >
      </External>
      )
    }
