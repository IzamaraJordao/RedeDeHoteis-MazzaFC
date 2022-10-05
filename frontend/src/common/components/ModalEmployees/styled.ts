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
    :hover{
      box-shadow: 0px 10px 13px -7px #000000, 3px -4px 21px 3px rgba(108,99,255,0);
    }
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

