import React, { useEffect, useState } from "react";
import axios from "axios";
import { TabelaCentral } from './styled';
import { DataGrid, GridRowsProp, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import Swal from 'sweetalert2'
import Modal from '../Modal/Modal';
import Button from '@mui/material/Button';



export type BancoHospedes = {
  id: Number;
  nome: String;
  cpf: String;
  email: String;
  observacao: String;
  telefone: String;
}

export type BancoReserva = {
  id: Number;
  consumo: String;
  checkin: Date;
  checkout: Date;
}

export type BancoQuarto = {
  id_quarto: Number;
  tipo: String;
  status: String;
}

export default function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hospedes, setHospedes] = useState<BancoHospedes[]>([]);
  const [reserva, setReserva] = useState<BancoReserva[]>([]);
  const [quartos, setQuartos] = useState<BancoQuarto[]>([]);
  

  useEffect(() => {
    axios.get("http://localhost:4000/hospedes")
      .then(res => {
        setHospedes(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/reserva")
      .then(res => {
        setReserva(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/quarto")
      .then(res => {
        setQuartos(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, []);


  const columns: GridColumns = [
    {
      field: 'status',
      headerName: 'Quarto',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
      renderCell: (cellValues: GridRenderCellParams<BancoQuarto>) => {
        return (
          <div
            style={{
              textAlign: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: `var(--${cellValues.row.status})`,
            }}>

          </div>
        )
      }
    },
    {
      field: 'Segunda',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              textAlign: 'center',
              color: 'blue',

            }}>
           
            <Button type="button" name="Reservar" onClick={() => setIsModalVisible(true)} > Reservar </Button>
            

            {cellValues.value}
          </div>
        )
      }
    },
    {
      field: 'status',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
    },
    {
      field: 'Quarta',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,
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


      <TabelaCentral>
        <div
          style={{ height: 350, width: '84.2%', color: '#222' }}>
          <DataGrid rows={hospedes} columns={columns}
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
      
      {/* {isModalVisible ? <h1>Testeeee</h1> : null} */}
      {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)} /> : null}

    </div>
  )
}
