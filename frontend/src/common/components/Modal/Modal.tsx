import React from 'react';
import Swal from 'sweetalert2'
import { Modal, ModalCentral, ModalDireita } from './styled';
import TextField from '@mui/material/TextField';


export default function BasicModal({ onClose }) {
  
  

  function close() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    onClose();
  }

  return (
    <div className="modal">
      <div className="container">
        <Modal>
          <h1>Reserva</h1>
          <ModalCentral>
            <div>
              <label>Quarto</label>
              <TextField id="outlined-basic" label="Quarto" variant="outlined" />
            </div>
            <ModalDireita>
              <label>Andar</label>
              <TextField id="outlined-basic" type="number" label="Andar" variant="outlined" />
            </ModalDireita>
          </ModalCentral>
          <ModalCentral>
            <div>
              <label>CPF</label>
              <TextField id="outlined-basic" type="number" label="CPF" variant="outlined" />
            </div>
            <div>
              <label>Hospedes</label>
              <TextField id="outlined-basic" label="Hospedes" variant="outlined" />
            </div>
          </ModalCentral>
          <ModalCentral>
            <div>
              <label>CHECK IN</label>
              <TextField id="outlined-basic" type="date"  variant="outlined" />
            </div>
            <div>
              <label>CHECK OUT</label>
              <TextField id="outlined-basic" type="date"  variant="outlined" />
            </div>
          </ModalCentral>
          <ModalCentral>
            <div>
              <label>Forma de Pagamento</label>
              <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
            <div>
              <label>Situação</label>
              <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
          </ModalCentral>
          <ModalCentral>
            <div>
            
              <TextField
                id="outlined-multiline-static"
                label="Observação"
                multiline
                rows={4}
                defaultValue="Observação"
              />
            </div>
          </ModalCentral>


        </Modal>

        <button onClick={close} type="button" className="btn btn-secondary" >Voltar</button>
      </div>
    </div>

  );
}

