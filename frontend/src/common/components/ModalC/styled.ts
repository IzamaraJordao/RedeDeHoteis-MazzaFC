
import styled from 'styled-components'
export const Modal = styled.div`
  background-color: rgb(0, 0, 0.2);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.9;
  padding: 1px;
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
    opacity: 1;
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
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .contactField{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    
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
