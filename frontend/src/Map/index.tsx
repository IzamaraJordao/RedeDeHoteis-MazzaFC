import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Button } from "@mui/material";
import { BoxDiv, BoxExternal } from './styled';


export default function bancoTabela() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>
      <div>

      <BoxExternal>
        <BoxDiv>
          <div>
            <Button variant="contained" onClick={() => setIsModalVisible(true)} >NOVO CADASTRO</Button>
          </div>
          <div>
          </div>
        </BoxDiv>
      </BoxExternal>

      </div>
      {/* {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)} /> : null} */}
    </div>
  )
}
