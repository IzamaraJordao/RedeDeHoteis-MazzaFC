import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabela from "../common/components/MultTabela/index";
import ModalFun from "../common/components/Modal-Fun/index";


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
    axios.get("http://localhost:4000/hospedes")
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
      <button onClick={()=>setIsModalVisible(true)}>open </button>
      {isModalVisible ?<ModalFun/>: null}
      <Tabela banco={guest} columns={columns} />
    </div>
  )
}
