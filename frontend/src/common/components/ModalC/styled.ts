
import styled from 'styled-components'
export const Modal = styled.div`
  background-color: rgb(0, 0, 5);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.8;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  form {
    width: 50%;
    margin-top: 50px;
    border: 2px #0000 solid;
    background: #fff;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:row; 
    flex-wrap: wrap;
    border:10px;
    gap: 20px;
    background:#fff;
    background-size:cover;
    opacity: 2;
  }
  .Itens{
    display: flex;
    flex-direction: rows;
    justify-content: center;
    gap: 15px;
    align-items: center;
    
  }
  .documentField{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
  }
  .contactField{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
   
    gap: 15px;
    
  }
  .Note{
    width: 85%;
  }

`

export const ModalCentral = styled.div`
  background: white;
  display: flex;
  flex-direction: row;
  margin: 2px;
  div {
    margin: 2px;
    display: flex;
    flex-direction: column;
  }
`
export const ContainerButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`
