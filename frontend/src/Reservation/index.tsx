import React, { useEffect, useState } from "react";
import ModalF from "../common/components/ModalC/index";
import { Button } from "@mui/material";
import { BoxDiv, BoxExternal } from './styled';


export default function bancoTabela() {
  const[isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>
   
      <BoxExternal>
        <BoxDiv>
          <div>
                   
          </div>
        </BoxDiv>
      </BoxExternal>
  
   
    {isModalVisible ?<ModalF onClose={() => setIsModalVisible(false)}/>: null}
    </div>
  )
}
