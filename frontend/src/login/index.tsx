import type { NextPage } from "next";
import React, { useState } from "react";




import {Title,Input,Form} from '../pages/style'

export default function Home()  {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  return (
    <>
    <div>
    <div>
        <Title>Rede<small>Inn</small>Hotel</Title>
        
        <Form>
            <label htmlFor="Email">Email</label>
            <Input type="email" name="email" id="email" placeholder="Digite o email"/>
            <label htmlFor="password">Senha</label>
            <Input type="password" name="password" id="password" placeholder="Digite a senha"/>
            <Input type="submit" value="Entrar" className="btn btn-primary btn-block"/>
        </Form> 
    </div>
    </div>
  </>
  );
};


