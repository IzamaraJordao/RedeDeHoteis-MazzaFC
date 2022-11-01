import styled from "styled-components";

export const ModalExterna = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  .registerModal{
    .updateModal{
      display:none
    }
  }
  .updateModal{
      .registerModal{
      display:none
    }
  }
;
`

export const ModalCentral = styled.div`
  display: flex;
  flex-direction: row;
  margin:2px;

  div{
    display: flex;
    margin-right: 10px; 
  }

  input{
    margin: 1px;
    color:var(--text);
   
  }
  label{
    color: var(--text);
    margin-left: 10px;
  }

;`


export const TituloCenter = styled.div`

  display: flex;
  /* justify-content: center; */
  text-align: center;
;`
export const InputNomeModal = styled.div`
  display: flex;
  flex-direction: column;
  margin:2px;
;
`
