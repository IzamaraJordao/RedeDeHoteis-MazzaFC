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
  height: 400px;
  border-radius: 5px;
  background-color: #e1dddd;
  display: flex;
  justify-content: center;
  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;
    gap: 5px;
   
  }
  input{
    height: 30px;
  }
  label{
    font-size: 1.2em ;
    font-weight: lighter;

  }

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
