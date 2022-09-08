import React, { useEffect, useState } from "react";
import axios from "axios";
import { FilterHead, BoxDiv } from './styled';
import Button from '@mui/material/Button';
import Modal from '../common/components/ModalRegistration/Modal';
import Input from '../common/components/Input/Index';
import {useSelector} from 'react-redux';



type BancoEmployees = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  perfil: string;
}

export default function bancoTabela() {

  const [employees, setEmployees] = useState<BancoEmployees[]>([]);
  const [isVisibled, setIsVisibled] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/employees")
      .then(res => {
        setEmployees(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, []);

  const qtd = 5;
  function extendInput(){
      for(let i = 0; i <= qtd; i++){
          return <Input/>
      }
    }
  

 
  return (
    <div>
      <BoxDiv>
        {extendInput()}
        <Input />
        <div>
        <Button variant="contained" onClick={()=> setIsVisibled(true)} >NOVO CADASTRO</Button>

        </div>
        <div>
          
        </div>
      </BoxDiv>
      {isVisibled && <Modal onClose={()=> setIsVisibled(false)} />}
    </div>
  )
}
