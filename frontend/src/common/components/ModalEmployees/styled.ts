import styled from "styled-components";


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

