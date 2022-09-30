import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabela from "../common/components/MultTabela/index";
import TextField from '@mui/material/TextField';
import { FilterHead, BoxDiv, BoxExternal } from './styled';
import { GridColumnHeaderParams, GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import Modal from '../common/components/ModalEmployees/Modal';
import { Typography } from "@mui/material";


type BancoEmployees = {
  id: number;
  nome: string;
  rg: string;
  cpf: string;
  email: string;
  fone: string;
}

export default function bancoTabela(): JSX.Element {

  const [employees, setEmployees] = useState<BancoEmployees[]>([]);
  const [isVisibled, setIsVisibled] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/employee?page=1") 
    // {
      // params: {
      //   page: 1,
      //   pageSize: 10,
      //   filter: "",
      // },
      // headers: {

      // }

    // })
      .then(res => {
        setEmployees(res.data.result);
      }).catch(err => {
        console.log(err);
      })
  }, []);
  // useEffect(() => {
  //   axios.get("http://localhost:3000/employee?page=1", {
  //     params: {
  //       page: 1,
  //       pageSize: 10,
  //       filter: "",
  //     },
  //     headers: {

  //     }

  //   })
  //     .then(res => {
  //       setEmployees(res.data);
  //     }).catch(err => {
  //       console.log(err);
  //     })
  // }, []);


  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'Id',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center', 
      width: 140,

      renderCell: (employee: GridRenderCellParams<BancoEmployees>) => {
        return (
          <div>
            <Typography variant="h6" color="white">{employee.row.id}</Typography>
          </div>
        )
      }
    },

    {
      field: 'name',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
      renderCell: (employee: GridRenderCellParams<BancoEmployees>) => {
        return (
          <div
            style={{
              textAlign: 'center',
              color: 'blue',
            }}>
              
            <Typography variant="h6" color="white">{employee.row.id}</Typography>
          </div>
        )
      }
    },
    {
      field: 'status',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
      renderCell: (cellValues: GridRenderCellParams<BancoEmployees>) => {
        return (
          <div
            style={{
              textAlign: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: `var(--${cellValues.row.status})`,
            }}>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{cellValues.row.tipo}</Typography>
          </div>
        )
      }
    },
    {
      field: 'Quartaaa',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
      renderCell: (cellValues) => {
        return (
          <div>
            <h1>Teste</h1>
          </div>
        )
      }
    },
    {
      field: 'Quinta',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
    },
    {
      field: 'Sexta',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
    },
    {
      field: 'Sábado',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
    }
  ];


  return (
    <div>
      <BoxExternal>
        <BoxDiv>
          <div>
            <Button variant="contained" onClick={() => setIsVisibled(true)} >NOVO CADASTRO</Button>
          </div>
          <div>
            <Tabela banco={employees} columns={columns} />
          </div>
        </BoxDiv>
      </BoxExternal>
      {isVisibled && <Modal onClose={() => setIsVisibled(false)} />}
    </div>
  )
}
