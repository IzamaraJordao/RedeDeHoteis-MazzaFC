import styled from 'styled-components'

export const Body = styled.div`
  background-image: url('https://img.freepik.com/fotos-gratis/piscina_74190-2109.jpg?w=2000');
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  background-size: cover;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  
`
export const Div = styled.div`
  height: 100vh;
  background-size: cover;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`


export const Input = styled.input`
  border-bottom: 2px solid #323232;

  padding: 5px;
  font-size: 1rem;
  margin-bottom: 20px;
  border-radius: 5px;
  focus {
    border-bottom: 2px solid #4d42fa;
    background-size: cover;
    border: none;
  }
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5%;
  background-color: #fff;
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  padding: 250px 30px;
  margin-top: 7vh;
  border-radius: 10px;
  
  h2 {
    
    font-size: 2rem;
    color: #4d42fa;
    margin-bottom: 20px;
    margin-top: -50%;
    
  }
  p {
    color: red;
    font-size: 1rem;
    
  }
 
  button {
    background-color: #4d42fa;
    color: #fff;
    width: 200px;
    height: 60px;
    padding: 6px;
    border-radius: 5px;
  }
`
