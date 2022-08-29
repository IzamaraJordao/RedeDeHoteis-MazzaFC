import * as Yup from "yup";
import React, { useState } from "react";
import {Input,Form,Body} from './style'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import router from "next/dist/client/router";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = Yup.object({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string().required("Senha é obrigatória").max(8, "Senha deve ter no máximo 8 caracteres").min(6, "Senha deve ter no mínimo 6 caracteres"),
  
}).required();


export default function Login()  {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  //funcão para guardar os dados do formulario
  async function handleRegister(email:string,password:string){
      await axios.post('http://localhost:3000/login',{
          email:email,
          password:password
    })
    router.push('./home');
  }

  return (

    <Body>
   
        
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Rede Inn Hotel</h2>


            <label htmlFor="Email">Email *</label>
            <Input type="email" id="email" placeholder="Digite o email" {...register("email")} />
            <p>{errors.email?.message}</p>
            <label htmlFor="password">Senha *</label>
            <Input type="password" id="password" placeholder="Digite a senha" {...register("password")}/>
            <p>{errors.password?.message}</p>
            <button type="submit" name="Entrar" className="btn btn-primary btn-block" onClick={()=>{handleRegister}}>Entrar</button> 
        </Form> 
    
    </Body>
  
  
  
  );
};


