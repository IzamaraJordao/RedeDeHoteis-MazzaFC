import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabela from "../common/components/MultTabela/index";
import TextField from '@mui/material/TextField';
import { width } from "@mui/system";
import { FilterHead } from './styled';
import { GridColumnHeaderParams } from "@mui/x-data-grid";



type BancoEmployees = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  perfil: string;
}

export default function bancoTabela() {

  const [employees, setEmployees] = useState<BancoEmployees[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/employees")
      .then(res => {
        setEmployees(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, []);

  function FilterHeader(props: String) {
    return (
      <FilterHead>
       
          <span>{props}</span>
        
        <div>
          <TextField id="standard-basic" label={props} />
        </div>
      </FilterHead>
    )
  }


  const columns = [{
    field: 'id',

    renderHeader: (params: GridColumnHeaderParams) => {
      return FilterHeader("Quarto");
    },
    width: 270,

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
    field: 'perfil',
    headerName: 'PERFIL',
  },
  {
    field: 'acoes',
    headerName: 'AÇÕES',
  }
  ];
  return (
    <div>
      <Tabela banco={employees} columns={columns} />
    </div>
  )
}
