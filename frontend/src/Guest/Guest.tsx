import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabela from "../common/components/MultTabela/index";


type BancoGuest = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export default function bancoTabela() {

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
      <Tabela banco={guest} columns={columns} />
    </div>
  )
}
