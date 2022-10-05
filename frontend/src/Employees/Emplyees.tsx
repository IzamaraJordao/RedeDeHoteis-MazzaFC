import React, { useEffect, useState } from "react";
import axios from "axios";
// import Tabela from "../common/components/MultTabela/index";
import TextField from '@mui/material/TextField';
import { Table, BoxDiv, BoxExternal, TableHeade } from './styled';
import Button from '@mui/material/Button';
import Modal from '../common/components/ModalEmployees/Modal';
import TableMain from '../common/components/TableEmployee/ColumnEmployee';





export default function bancoTabela(props: any) {

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



  return (
    <div>
      <BoxExternal>
        <BoxDiv>
          <div>
            <Button variant="contained" onClick={() => setIsVisibled(true)} >NOVO CADASTRO</Button>
          </div>
         
         <TableMain />

        </BoxDiv>
      </BoxExternal>
      {isVisibled && <Modal onClose={() => setIsVisibled(false)} />}
    </div>
  )
}


