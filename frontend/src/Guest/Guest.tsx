import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabela from "../common/components/MultTabela/index";
import ModalF from "../common/components/ModalC/index";
import { Button } from "@mui/material";
import { ButtonC } from "../common/components/Button/Index";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import '../assets/edit.svg'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { pink, yellow } from "@mui/material/colors";


type BancoGuest = {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

export default function bancoTabela() {
  const router = useRouter();
  const[isModalVisible, setIsModalVisible] = useState(false);
  const [guest, setGuest] = useState<BancoGuest[]>([]);
  const [formValues, setFormValues] = useState({
    id: Number,
    nome: "",
    cpf: "",
    rg: "",
    dt_nasc: "",
    email: "",
    phone: Number,
    road: "",
    number: Number,
    complement: "",
    district: "",
    city: "",
    zip_code: Number,
    state: "",
    note:"",
  })

  useEffect(() => {
    axios.get("http://localhost:4000/hospedes")
      .then(res => {
        setGuest(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, []);

async function handleEdit (id: number)  {
 await axios.put(`http://localhost:4000/hospedes/${id}`, {
    id: Number(formValues.id),
    nome: String(formValues.nome),
    cpf: String(formValues.cpf),
    rg: String(formValues.rg),
    dt_nasc: String(formValues.dt_nasc),
    email: String(formValues.email),
    phone: Number(formValues.phone),
    road: String(formValues.road),
    number: Number(formValues.number),
    complement: String(formValues.complement),
    district: String(formValues.district),
    city: String(formValues.city),
    zip_code: Number(formValues.zip_code),
    state: String(formValues.state),
    note: String(formValues.note),
});

await Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})
 router.push("/guest");
}

  const columns = [{
    field: 'id',
    headerName: 'CÓDIGO', 
    headerAlign: 'center',
    width: 80,   
  }, 
  {
    field: 'nome',
    headerName: 'NOME',
    headerAlign: 'center',
    width: 140,
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    headerAlign: 'center',
    width: 140,
  },
  {
    field: 'email',
    headerName: 'EMAIL',
    headerAlign: 'center',
    width: 160,
  },
  {
   field: 'phone',
    headerName: 'TELEFONE',
    headerAlign: 'center',
    width: 140,
  },
  {
    field: 'note',
    headerName: 'AÇÕES',
    headerAlign: 'center',
    width: 140,
    height: 80,
    renderCell: (params: any) => {
      return (
        <>
          <ButtonC

            onClick={() =>{handleEdit(params.row.id)}}
          >
            <SvgIcon sx={{ color:'yellow'}} >
           
            <path d="M11 5.11267H4C3.46957 5.11267 2.96086 5.35702 2.58579 5.79196C2.21071 6.22691 2 6.81682 2 7.43192V23.6667C2 24.2818 2.21071 24.8717 2.58579 25.3066C2.96086 25.7416 3.46957 25.9859 4 25.9859H18C18.5304 25.9859 19.0391 25.7416 19.4142 25.3066C19.7893 24.8717 20 24.2818 20 23.6667V15.5493" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 3.37327C18.8978 2.91194 19.4374 2.65277 20 2.65277C20.5626 2.65277 21.1022 2.91194 21.5 3.37327C21.8978 3.8346 22.1213 4.46029 22.1213 5.11271C22.1213 5.76512 21.8978 6.39082 21.5 6.85214L12 17.8686L8 19.0282L9 14.3897L18.5 3.37327Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           
           </SvgIcon>
          </ButtonC>

          <ButtonC onClick={()=>{handleEdit(params.row.id)}}>
            <SvgIcon sx={{ color:'Blue'}} >
            <path d="M2 14.3896C2 14.3896 5 6.27228 12 6.27228C19 6.27228 22 14.3896 22 14.3896C22 14.3896 19 22.507 12 22.507C5 22.507 2 14.3896 2 14.3896Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17.8686C13.6569 17.8686 15 16.311 15 14.3897C15 12.4684 13.6569 10.9108 12 10.9108C10.3431 10.9108 9 12.4684 9 14.3897C9 16.311 10.3431 17.8686 12 17.8686Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

              </SvgIcon>
           
          </ButtonC>
         
        </>
      );
    }
  }
];
  return (
    <div>
    <div> 
      <ButtonC style={{
        color: '#fff',
        backgroundColor: 'green',
        width: '150px',
        height: '40px',
        padding: '15px',

      }} onClick={()=>setIsModalVisible(true)}>Cadastrar novo Hóspede </ButtonC>
      
      <Tabela  banco={guest} columns={columns} />
    </div>
    
    {isModalVisible ?<ModalF onClose={() => setIsModalVisible(false)}/>: null}
    </div>
  )
}
