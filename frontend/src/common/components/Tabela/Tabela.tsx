import React, { useEffect, useState } from "react";
import axios from "axios";
import { TabelaCentral, BoxDiv } from './styled';
import { DataGrid, GridRowsProp, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import Modal from '../Modal/Modal';
import Button from '@mui/material/Button';
import { Box, Typography } from "@mui/material";
import Popover from "../Informativo/Popover";


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
  id: Number;
  numero: Number;
  tipo: String;
  status: String;
}

export default function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hospedes, setHospedes] = useState<BancoHospedes[]>([]);
  const [reserva, setReserva] = useState<BancoReserva[]>([]);
  const [quartos, setQuartos] = useState<BancoQuarto[]>([]);

  const size = quartos.length;


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
      field: 'numero',
      headerName: 'Comsumo',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 140,

      renderCell: (quarto: GridRenderCellParams<BancoQuarto>) => {
        return (
          <div
            style={{
              textAlign: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: `var(--text)`,
            }}
          >
            <Typography variant="h6" color="white">{quarto.row.numero}</Typography>
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
      renderCell: (cellValues: GridRenderCellParams<BancoQuarto>) => {
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

      <BoxDiv>
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
      </BoxDiv>


      {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)} /> : null}

    </div>
  )
}
