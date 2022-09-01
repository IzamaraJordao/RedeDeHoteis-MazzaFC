import styled from 'styled-components'

export const BodyLogin = styled.div`
  background-image: url('https://img.freepik.com/fotos-gratis/piscina_74190-2109.jpg?w=2000');
  background-size: cover;
  box-sizing: border-box;
  height: 96vh;
  overflow: hidden;
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
  background-color: #fff;
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  padding: 100px 30px;
  margin-top: 7vh;
  border-radius: 5px;
  
  h2 {
    
    font-size: 2rem;
    color: #4d42fa;
    
  }
  p {
    color: red;
    font-size: 1rem;
    
  }
 
  button {
    background-color: #4d42fa;
    color: #fff;
    width: 200px;
    height: 40px;
    border-radius: 5px;
  }
`
