import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Table } from './styled';
import TableMain from './index';
import React, {useEffect, useState} from 'react'
import axios from 'axios';

export type BancoEmployees = {
  id: number;
  nome: string;
  rg: string;
  cpf: string;
  email: string;
  fone: string;
}


export default function ColumnEmployee(props: any) {

  const [employees, setEmployees] = useState<BancoEmployees[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  


  async function tableMain(page: number, pageSize: number, filter?: object) {
    setIsLoading(true);
    const response = await axios.get("http://localhost:3000/employee", {
      params: {
        page,
        pageSize,
        filter,
    }
    });
    setEmployees(response.data.result);
    setPage(response.data.current);
    setPageSize(response.data.pageSize);
    setTotal(response.data.total);
    setIsLoading(false);
  }


  useEffect(() => {
    tableMain(1,10);
  },[])

  const columns: GridColDef[] = [

    { field: 'name',
      headerName: 'Nome',
      headerAlign: 'center',
      width: 180,
      sortable: false,
      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho  
    },

    {
      field: 'cpf',
      headerName: 'CPF',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      sortable: false,
      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho
     
      renderCell: (employee: GridRenderCellParams<BancoEmployees>) => {
        return (
          <div style={{ color: 'blue', marginLeft: '15px' }}>
            {employee.row.cpf}
          </div>
        )
      }
    },

    {
      field: 'rg',
      headerName: 'RG',
      headerAlign: 'center',
      width: 180,
      sortable: false,
      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho
    },

    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'center',
      width: 180,

    },
    {
      field: 'phone',
      headerName: 'Telefone',
      headerAlign: 'center',
      width: 180,
    
    },
    {
      field: 'active',
      headerName: 'Ativo',
      headerAlign: 'center',
      width: 180,
      renderCell: (employee: GridRenderCellParams<BancoEmployees>) => {
        if (employee.row.active === true) {
          return (
            <Table>
              Sim
            </Table>
          )
        } else {
          return (
            <Table>
              Não
            </Table>
          )
        }
      }
    }

  ];



  return (
    <TableMain 
      data={employees}
      columns={columns}
      search={tableMain} 
      isLoading={isLoading} 
      page={page} 
      pageSize={pageSize}
      total={total}      
    />
  )
}
