import './styled.css'
import React from 'react'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from 'axios'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'


export type ModalProps = {
  id: number
  name: string
  cpf: string
  rg: string
  dt_nasc: Date
  email: string
  phone: string
  road: string
  number: number
  complement: string
  district: string
  city: string
  zip_code: string
  state: string
  note: string
}

const schema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  rg: Yup.string().required('RG é obrigatório'),
  dt_nasc: Yup.string().required('Data de Nascimento é obrigatório'),
  email: Yup.string().required('Email é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
})

export function ModalFun({ onClose }) {
  const [hospedes, setHospedes] = useState<ModalProps[]>([])
  const [open, setOpen] = useState(false);

  const {register,handleSubmit,formState: { errors } } = useForm({resolver: yupResolver(schema)})

  const onSubmit = (data: ModalProps ) => {
        axios.post("http://localhost:4000/hospedes", {
            nome: data.name,
            cpf: data.cpf,
            rg: data.rg,
            dt_nasc: data.dt_nasc,
            email: data.email,
            phone: data.phone,
            road: data.road,
            number: data.number,
            complement: data.complement,
            district: data.district,
            city: data.city,
            zip_code: data.zip_code,
            state: data.state,
            note: data.note,

        }).then((res) => {
        setHospedes([...hospedes, res.data]);
        })
    }
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
        <button onClick={handleOpen}>Open modal</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box >

           
              {/* <form onSubmit={handleSubmit(onSubmit)}> 
                <div className='container'>
                <TextField id="nome" label="Hospedes" variant="outlined"  {...register("nome")} />
                <p>{errors.name.message}</p>
                </div>
            </form> */}
          </Box>
        </Modal>
      </div>
    )
}


