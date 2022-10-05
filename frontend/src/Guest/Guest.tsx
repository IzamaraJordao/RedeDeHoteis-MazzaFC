import React, { useEffect, useState } from "react";
import ModalF from "../common/components/ModalC/index";
import { Button } from "@mui/material";
import { BoxDiv, BoxExternal } from './styled';
import TableGuest from '../common/components/TableGuest';


export default function bancoTabela() {
  const[isModalVisible, setIsModalVisible] = useState(false);


  return (
    <div>
   
      <BoxExternal>
        <BoxDiv>
          <div>
            <Button variant="contained" onClick={() => setIsModalVisible(true)} >NOVO CADASTRO</Button>
          </div>       
           <TableGuest />     
        </BoxDiv>
      </BoxExternal>
  
   
    {isModalVisible ?<ModalF onClose={() => setIsModalVisible(false)}/>: null}
    </div>
  )
}
