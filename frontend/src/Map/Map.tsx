import React, { useEffect, useState } from "react";
import axios from "axios";
import { FilterHead, BoxDiv } from './styled';
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

export default function bancoTabela() {

  const [employees, setEmployees] = useState<BancoEmployees[]>([]);
  const [isVisibled, setIsVisibled] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/employee")
      .then(res => {
        setEmployees(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, []);

  
  return (
    <div>
      <BoxDiv>
        <div>
        <Button variant="contained" onClick={()=> setIsVisibled(true)} >NOVO CADASTRO</Button>
      
        </div>
        <div>
          <button className="btn btn-primary ">Test</button>
          <button className="btn btn-secondary ">Test</button>
          


          <div className="form-group">
            <label className="form-group form-group__label"></label>
            <input className="form-group form-group_input" type="text" />
            <input className="form-group form-group_input form-group_input--error" type="text" />
          </div>
        </div>
      </BoxDiv>
      {isVisibled && <Modal onClose={()=> setIsVisibled(false)} />}
    </div>
  )
}
