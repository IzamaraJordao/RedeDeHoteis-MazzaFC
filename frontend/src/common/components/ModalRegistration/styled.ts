import styled from "styled-components";

export const ModalExterna = styled.div`

`;

export const ModalCentral = styled.div`
  display: flex;
  flex-direction: row;
  margin:2px;
  div{
    margin: 2px;
    display: flex;
    flex-direction: column;
  }
  label{
    margin-left: 10px;
    font-size: 1.2rem;
  }
`;
export const ModalDireita = styled.div`

  input{
    width: 350px;
  }
`;
export const ModalEsquerda = styled.div`
label{
  margin-left: 10px;
  font-size: 1.2rem;
}
  input{
    width: 560px;
  }
`;

