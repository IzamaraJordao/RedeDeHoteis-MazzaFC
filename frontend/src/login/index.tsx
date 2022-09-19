import * as Yup from 'yup'
import React, { useState } from 'react'
import { Input, Form, BodyLogin,Div } from './style'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
// import router from "next/dist/client/router";
import { useRouter } from 'next/router'
// import style from './login.module.css'
import { useDispatch } from 'react-redux'
import { setEmail } from '../store/authSlice'
import { wrapper } from '../store/store'

interface IFormInputs {
  email: string
  password: string
}

const schema = Yup.object({
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .max(8, 'Senha deve ter no máximo 8 caracteres')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
}).required()

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: IFormInputs) => {
    dispatch(setEmail(data.email))
    // console.log(data.email)
    router.push('/home')
  }

  //funcão para guardar os dados do formulario e validar se estão corretos
  async function handleRegister(email: string, password: string) {
    await axios.post('http://localhost:4000/login', {
      email: email,
      password: password,
    })
    router.push('/home')
  }

  return (
    <BodyLogin>
      <Form onSubmit={handleSubmit(onSubmit)}>
      
          <h2>Rede Inn Hotel</h2>
       

        <label htmlFor="Email">Email *</label>
        <Input
          type="email"
          id="email"
          placeholder="Digite o email"
          {...register('email')}
        />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Senha *</label>
        <Input
          type="password"
          id="password"
          placeholder="Digite a senha"
          {...register('password')}
        />
        <p>{errors.password?.message}</p>
        <button
          type="submit"
          name="Entrar"
          className="btn btn-primary btn-block"
          onClick={() => {
            handleRegister
          }}
        >
          Entrar
        </button>
      </Form>
    </BodyLogin>
  )
}
