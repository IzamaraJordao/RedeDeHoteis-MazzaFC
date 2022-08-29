import styled from 'styled-components'



export const Body = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  background-color:white;
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  padding: 100px 30px;
  margin-top: 7vh;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  
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
    color: white;
    width: 200px;
    height: 40px;
    border-radius: 5px;
  }
`
