import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from 'axios'


import {
  ContainerButton,
  Modal,
} from '../ModalC/styled'
import '../../components/Input/Index'
import { ButtonC } from '../Button/Index'
import { InputS } from '../../components/Input/Index'
;



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
  cpf: Yup.string()
    .required('CPF é obrigatório')
    .max(11, 'CPF deve ter no máximo 11 caracteres')
    .min(11, 'CPF deve ter no mínimo 11 caracteres'),
  rg: Yup.string()
    .required('RG é obrigatório')
    .max(9, 'RG deve ter no máximo 9 caracteres')
    .min(9, 'RG deve ter no mínimo 9 caracteres'),
  dt_nasc: Yup.string().required('Data de Nascimento é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
}).required()

export default function ModalC({ onClose }) {
  const [hospedes, setHospedes] = useState<ModalProps[]>([])
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalProps>({ resolver: yupResolver(schema) })

  const onSubmit = (data: ModalProps) => {
    axios
      .post('http://localhost:4000/guest', {
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
      })
      .then((res) => {
        setHospedes([...hospedes, res.data])
      })
  }
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  
  return (
    <Modal>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-Table">
             <span>Nome *</span>
              <InputS style={{
                width:'100%'
              }} id="name" type="text"  {...register('name')} />
              <span>{errors.name?.message}</span>
  
            <div className="documentField">
              <div>
                <span>CPF *</span>
                <InputS {...register('cpf')} />
                <span>{errors.cpf?.message}</span>
              </div>
              <div>
                <span>RG *</span>
                <InputS {...register('rg')} />
                <span>{errors.rg?.message}</span>
              </div>
              <div>
                <label>Data de Nasc. *</label>
                <input  type="date" {...register('dt_nasc')} />
                <span>{errors.dt_nasc?.message}</span>
              </div>
            </div>
            <div className='contactField'>
            <div>
              <span>EMAIL *</span>
              <InputS {...register('email')} />
            </div>
            <div>
              <label>TELEFONE *</label>
              <InputS {...register('phone')} />
            </div>
            </div>
            <div className="Itens">

            <div>
              <label>CEP</label>
              <InputS {...register('zip_code')} />
            </div>
            <div>
              <label>LOGRADOURO</label>
              <InputS {...register('road')} />
            </div>

            <div>
              <label>BAIRRO</label>
              <InputS {...register('district')} />
            </div>
            <div>
              <label>NUMERO</label>
              <InputS {...register('number')} />
            </div>

            <div>
              <label>CIDADE</label>
              <InputS {...register('city')} />
            </div>
            <div>
              <label>UF</label>
              <InputS {...register('state')} />
            </div>
            <div>
              <label>COMPLEMENTO</label>
              <InputS {...register('complement')} />
        
            </div>
            </div>
            <div className='Note' >
              <label>OBSERVAÇÕES</label>
              <InputS       style={{
                 padding: '90px'
                }}{...register('note')} />
            </div>
  

            <ContainerButton>
              <ButtonC
                style={{
                  border: 'solid 1px #a9a9a9',
                  borderRadius: 5,
                  backgroundColor: '#188b52ba',
                }}
                onClick={() => {
                  handleClose
                }}
              >
                Salvar
              </ButtonC>

              <ButtonC
                style={{
                  border: 'solid 1px #a9a9a9',
                  borderRadius: 5,
                  backgroundColor: '#e95531b9',
                }}
                onClick={onClose}
              >
                Voltar
              </ButtonC>
            </ContainerButton>
            </div>
          </form>

    </Modal>
  )
}
