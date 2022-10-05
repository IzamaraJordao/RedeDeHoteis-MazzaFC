import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabela from "../common/components/MultTabela/index";
import TextField from '@mui/material/TextField';
import { FilterHead, BoxDiv } from './styled';
import { GridColumnHeaderParams } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import Modal from '../common/components/ModalEmployees/Modal';
import {useSelector} from 'react-redux';



type BancoEmployees = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  perfil: string;
}

export default function bancoTabela(): JSX.Element {

  const [employees, setEmployees] = useState<BancoEmployees[]>([]);
  const [isVisibled, setIsVisibled] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/employee")
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
      <BoxDiv>
        <div>
        <Button variant="contained" onClick={()=> setIsVisibled(true)} >NOVO CADASTRO</Button>

        </div>
        <div>
          <Tabela banco={employees} columns={columns} />
        </div>
      </BoxDiv>
      {isVisibled && <Modal onClose={()=> setIsVisibled(false)} />}
    </div>
  )
}
