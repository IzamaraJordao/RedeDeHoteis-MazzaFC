import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabela from "../common/components/MultTabela/index";
import TextField from '@mui/material/TextField';
import { Table, BoxDiv, BoxExternal, TableHeade } from './styled';
import { GridColDef, GridColumnHeaderParams, GridColumns, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import Modal from '../common/components/ModalEmployees/Modal';

type BancoEmployees = {
  id: number;
  nome: string;
  rg: string;
  cpf: string;
  email: string;
  fone: string;
}

// export interface Props {
//   data: GridRowsProp<any>
//   columns: GridColDef[]
// }

export default function bancoTabela(props: any) {

  const [employees, setEmployees] = useState<BancoEmployees[]>([]);
  const [isVisibled, setIsVisibled] = useState(false);
  const [filter, setFilter] = useState<any>()
  const [filterName, setFilterName] = useState<any>()
  const [pageSize, setPageSize] = useState(10);



  useEffect(() => {
    axios.get("http://localhost:3000/employee", {
      params: {
        page: 1,
        pageSize : pageSize,
        filter: ""
      }
    })
      .then(res => {
        setEmployees(res.data.result);
      }).catch(err => {
        console.log(err);
      })
  }, []);



  const columns: GridColDef[] = [
 
    {
      field: 'name',
      width: 250,
      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho
      sortable: false, /// remove o botão de ordenação
      align: 'center', ///alinhar a coluna
      editable: true, /// Permite q as colunas sejam editáveis
      headerAlign: 'center', ///alinhar o cabeçalho
      filterable: true, /// inclui o icone de filtro no cabeçalho
      hide: false, /// esconde a coluna
      // minWidth: 100, /// define o tamanho minimo da coluna
      // maxWidth: 200, /// define o tamanho maximo da coluna
      renderHeader: () => (
        <TableHeade>
        <strong>
          {'Name '}
          <span role="img" aria-label="enjoy">
            🎂
          </span>
        </strong>
        <div>
          <input value={filter} onChange={(e)=> setFilter(e.target.value)} />
          <button>Buscar</button>
        </div>
        </TableHeade>
      ),
      
    },
    {
      field: 'email',
      headerName: 'E-mail',
      sortable: false,
      width: 150,
      headerAlign: 'center', ///alinhar o cabeçalho
      filterable: true, /// inclui o icone de filtro no cabeçalho
      editable: true, /// Permite q as colunas sejam editáveis
      // disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho
    },
    {
      field: 'city',
      headerName: 'Cidade',
      type: 'string',
      width: 150,
    }
  ]


  // const columns: GridColumns = [
  //   renderHeader: () => {
  //     <div>
  //       <p>Teste</p>
  //     </div>
  //   },

  //   { field: 'name',
  //     headerName : 'Nome',
  //     headerAlign: 'center',
  //     width: 140,
      

  //     renderCell: (employee: GridRenderCellParams<BancoEmployees>) => {
  //       return (
  //         <Table>
  //           {employee.row.name}
  //         </Table>
  //       )
  //     }
  //   },

  //   { field: 'cpf',
  //     headerName: 'CPF',
  //     headerAlign: 'center',
  //     width: 140,
  //     renderCell: (employee: GridRenderCellParams<BancoEmployees>) => {
  //       return (
  //         <div style={{ color: 'blue', marginLeft: '15px'}}>
  //           {employee.row.cpf}
  //         </div>
  //       )
  //     }
  //   },

  //   { field: 'rg',
  //     headerName: 'RG',
  //     headerAlign: 'center',
  //     width: 140,
  //     renderCell: (employee: GridRenderCellParams<BancoEmployees>) => {
  //       return (
  //         <Table>
  //           {employee.row.rg}
  //         </Table>
  //       )
  //     }
  //   }, 

  //   { field: 'email',
  //     headerName: 'Email',
  //     headerAlign: 'center',
  //     width: 240,
      

  //     renderCell: (employee: GridRenderCellParams<BancoEmployees>) => {
  //       return (
  //         <Table>
  //           {employee.row.email}
  //         </Table>
  //       )
  //     }
  //   },   
  //   { field: 'phone',
  //     headerName: 'Telefone',
  //     headerAlign: 'center',
  //     width: 140,
  //     renderCell: (employee: GridRenderCellParams<BancoEmployees>) => {
  //       return (
  //         <Table>
  //           {employee.row.phone}
  //         </Table>
  //       )
  //     }
  //   },
  //   { field: 'active',
  //   headerName: 'Ativo',
  //   headerAlign: 'center',
  //   width: 140,
  //   renderCell: (employee: GridRenderCellParams<BancoEmployees>) => {
  //     if(employee.row.active === true){
  //       return (
  //         <Table>
  //           Sim
  //         </Table>
  //       )
  //     }else{
  //       return (
  //         <Table>
  //           Não
  //         </Table>
  //       )
  //     }
  //   }
  // }

  // ];


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


