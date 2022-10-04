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
div{
  margin-top: 2px;

  button{
    margin-top: 2px;
    background-color: var(--text);
    &:hover {
      background-color: var(--secondary);
    }
    }
  }
`;

export const Table = styled.table`
  margin-left: 20px;
`;

export const TableHeade = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  strong{
    margin-top: -10px;
  }
  div{
    margin-top: -30px;
    input{
      width: 7em;
      border-radius: 6px;
    }
    button{
      color: #fff;
    }
  }
`;
//
