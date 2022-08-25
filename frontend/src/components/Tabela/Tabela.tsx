import React, { useEffect, useState } from "react";
import axios from "axios";
import { TabelaCentral } from './styled';
import { DataGrid, GridRowsProp, GridColDef, GridColumns } from '@mui/x-data-grid';
///GridColDef pode incluir uma função ou combinação para uma deternminada coluna
import Swal from 'sweetalert2'


export type BancoQuarto = {
  id: number;
  hospede: string;
  quarto: string;
}


export default function App() {

  const [quartos, setQuartos] = useState <BancoQuarto[]>([]);
//  console.log(quartos[0].id);


  useEffect(() => {
    axios.get("http://localhost:4000/home")
      .then(res => {
        setQuartos(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, []);




  const columns: GridColumns = [
    {
      field: 'quarto',
      headerName: 'Quarto',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
      renderCell: (cellValues)=>{
        return(
          <div
            style={{
              textAlign: 'center',
              color: 'blue',
              
              }}>
            {cellValues.value}
          </div>
        )
      }
    },
    {
      field: 'Segunda',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140 ,
      renderCell: (cellValues)=>{
        return(
          <div
            style={{
              textAlign: 'center',
              color: 'blue',
              
              }}>
                {/* <button onClick={}>Reserva</button> */}
            {cellValues.value}
          </div>
        )
      }
    },
    {
      field: 'Terça',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
    },
    {
      field: 'Quarta',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140 ,
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
      width: 140 ,
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


      <TabelaCentral>
        <div
          style={{ height: 350, width: '84.2%', color: '#222' }}>
          <DataGrid rows={quartos} columns={columns} 
          sx={{
            height: 300,
            width: '100%', '& .super-app-theme--header': {
              backgroundColor: '#dcdff4', color: '#858485'
            },
            '& .super-app.negative': {
              backgroundColor: 'rgba(157, 255, 118, 0.49)',
              color: '#1a3e72',
              fontWeight: '600',
            },
            '& .super-app.positive': {
              backgroundColor: '#d47483',
              color: '#1a3e72',
              fontWeight: '600',
            },
            color: '#333',
          }} />
        </div>
      </TabelaCentral>

    </div>
  )
}
