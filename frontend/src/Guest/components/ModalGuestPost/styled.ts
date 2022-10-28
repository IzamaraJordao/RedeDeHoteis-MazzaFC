import styled from "styled-components";

export const ModalExterna = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.95;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

`;


export const ModalDireita = styled.div`

  input{
    width: 350px;
  }
`;
export const InputNomeModal = styled.div`
  display: flex;
  flex-direction: column;
  margin:2px;
`;

