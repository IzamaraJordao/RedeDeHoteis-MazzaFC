import styled from "styled-components";

export const FilterHead = styled.div`


  div{
    input{
      
      width: 3em
    }
  }
`;

export const BoxExternal = styled.div`
  margin: 2em;
  width: 95%;
  height: 450px;
  border-radius: 5px;
  background-color: #e1dddd;
  display: flex;
  justify-content: center;
`;

export const BoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 40px;
div{
  margin-top: 2px;

  button{
    margin-top: 20px;
    width: 200px;
    height: 60px;
    background-color: var(--text);
    &:hover {
      background-color: var(--secondary);
    }
    }
  }
`;
export const InputNomeModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin:20px;
`;

export const ModalInternaFloors = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input{
  width: 100px;
  height: 1px;
}

`;

export const ModalExterna = styled.div`
display: flex;
flex-direction: row;
`;


export const ModalInterna = styled.div`
  display: flex;
  flex-direction: column;
  margin:2px;
  color: var(--text);
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  height: auto;  
  `;
