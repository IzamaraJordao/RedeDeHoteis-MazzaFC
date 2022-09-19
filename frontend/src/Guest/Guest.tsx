import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabela from "../common/components/MultTabela/index";
import ModalF from "../common/components/ModalC/index";
import { Button } from "@mui/material";
// import '../common/components/ModalC/index.css'


type BancoGuest = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export default function bancoTabela() {
  const[isModalVisible, setIsModalVisible] = useState(false);
  const [guest, setGuest] = useState<BancoGuest[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/guest")
      .then(res => {
        setGuest(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, []);

  const columns = [{
    field: 'id',
    headerName: 'CÓDIGO',    
  }, 
  {
    field: 'nome',
    headerName: 'NOME',
  },
  {
    field: 'cpf',
    headerName: 'CPF',
  },
  {
    field: 'email',
    headerName: 'EMAIL',
  },
  {
   field: 'telefone',
    headerName: 'PERFIL',
  },
  {
    field: 'acoes',
    headerName: 'AÇÕES',
  }
];
  return (
    <div>
    <div> 
      <Button color="success" variant="contained" type='submit' onClick={()=>setIsModalVisible(true)}>open </Button>
      
      <Tabela banco={guest} columns={columns} />
    </div>
    
    {isModalVisible ?<ModalF onClose={() => setIsModalVisible(false)}/>: null}
    </div>
  )
}
