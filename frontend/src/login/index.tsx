import * as Yup from 'yup'
import React, { useState } from 'react'
import {  Form, BodyLogin, Div } from './style'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import router, { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setAuth } from '../store/authSlice'
import { createSession } from '../api/login/login'
import { Button, TextField } from '@mui/material'
import { useSnackbar, VariantType, SnackbarProvider } from 'notistack'


interface IFormInputs {
  email: string
  password: string
}

const schema = Yup.object({
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
}).required()

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: IFormInputs) => {
    //response
    let response
    try {
      response = await createSession(data.email, data.password, enqueueSnackbar)
      console.log(response.data)
    } catch (e) {
      console.log(e)
      return
    }
    //dispach
    dispatch(setAuth(response.data))
    // dispatch(setEmail(data.email))
    localStorage.setItem('@token', response.data.token)
    localStorage.setItem('@hotel', JSON.stringify(response.data.hotel))
    localStorage.setItem('@user', JSON.stringify(response.data.user))

    router.push('/home')
  }

  //funcão para guardar os dados do formulario e validar se estão corretos
  async function handleRegister(email: string, password: string) {
    try {
      const response = await axios.post('http://localhost:3030/login', {
        email,
        password,
      })
      console.log(response.data)
    } catch (e) {
      console.log(e)
      return
    }
    router.push('/home')
  }

  return (
 
    <BodyLogin>
   
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Rede Inn Hotel</h2>

        <label htmlFor="Email">Email: *</label>
        <TextField
          type="email"
          id="standard-basic" variant="standard" 
          placeholder="Digite o email"
          {...register('email')}
        />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Senha: *</label>
        <TextField
          type="password"
          id="standard-basic"  variant="standard" color="primary"
          placeholder="Digite a senha"
          {...register('password')}
        />
        <p>{errors.password?.message}</p>
        <Button type="submit" variant="contained" color="primary">
          Entrar
        </Button>
      </Form>
    </BodyLogin>
   
  )
}
