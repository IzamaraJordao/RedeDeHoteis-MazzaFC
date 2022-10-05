import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import TableMain from '../MultTabela/index';
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export type BancoGuest = {
  id: number;
  nome: string;
  rg: string;
  cpf: string;
  email: string;
  phone: string;

}


export default function ColumnGuest() {

  const [guest, setGuest] = useState<BancoGuest[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  


  async function tableMain(page: number, pageSize: number, filter?: object) {
    setIsLoading(true);
    const response = await axios.get("http://localhost:3000/guest", {
      params: {
        page,
        pageSize,
        filter,
    }
    });
    setGuest(response.data.result);
    setPage(response.data.current);
    setPageSize(response.data.pageSize);
    setTotal(response.data.total);
    setIsLoading(false);
  }

  function handleDelete(id: number) {
    Swal.fire({
      title: 'Deseja realmente excluir?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      denyButtonText: `Não Remover`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/guest/${id}`)
        .then(res => {
          tableMain(page, pageSize);
        }).catch(err => {
          console.log(err);
        })
        Swal.fire('Hospede excluido', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  useEffect(() => {
    tableMain(1,10);
  },[])

  const columns: GridColDef[] = [

    { field: 'name',
      headerName: 'Nome',
      headerAlign: 'center',
      width: 180,
      align: 'center',
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
     
      renderCell: (employee: GridRenderCellParams<BancoGuest>) => {
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
      align: 'center',
      sortable: false,
      
      disableColumnMenu: true, //// desabilita todas as funcionalidades do cabeçalho
    },

    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      disableColumnMenu: true,

    },
    {
      field: 'phone',
      headerName: 'Telefone',
      headerAlign: 'center',
      width: 180,
      align: 'center',
      disableColumnMenu: true,
    
    },

    {
      field: 'id',
      headerName: 'Ações',
      headerAlign: 'center',
   
      width: 80,
      align: 'center',
      disableColumnMenu: true,
      renderCell: (employee: GridRenderCellParams<BancoGuest>) => {
        return (
          <div>
            <IconButton color='error' sx={{backgroundColor: '#fff !important'}} onClick={() => { handleDelete(employee.row.id) }}><DeleteIcon/></IconButton>
          </div>
        )
      }
    }
  
  ];



  return (
    <TableMain 
      data={guest}
      columns={columns}
      search={tableMain} 
      isLoading={isLoading} 
      page={page} 
      pageSize={pageSize}
      total={total}      
    />
  )
}
