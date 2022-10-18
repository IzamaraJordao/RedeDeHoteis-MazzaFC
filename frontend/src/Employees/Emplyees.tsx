import React, { useState } from "react";
import { BoxDiv, BoxExternal } from './styled';
import Button from '@mui/material/Button';
import Modal from '../common/components/ModalEmployees/Modal';
import TableMain from '../common/components/TableEmployee/ColumnEmployee';





export default function bancoTabela(props: any) {

  const [isVisibled, setIsVisibled] = useState(false);





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


